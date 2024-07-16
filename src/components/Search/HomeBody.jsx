import { useState, useEffect, Suspense } from "react";
import { useStore } from "@nanostores/react";
import { changeSortStore, sort } from "../../stores/sortField";
import { changePageNumStore, pageNum } from "../../stores/pageNum";
import { changeSearchStore, search } from "../../stores/search";
import { ConfigProvider } from "antd";
import SearchResult from "./SearchResult";
import SearchPagination from "./SearchTools/SearchPagination";
import Unfound from "../Unfound";
import theme from "../Styles/themeConfig";
import { metatags } from "../../utils/Constants/metatags";
import { env } from "../../utils/Constants/env";
import { fetchIndex, fetchBrowse } from "../../utils/getDocuments";

function HomeBody() {
	const [data, setData] = useState([]);

	const $sortField = useStore(sort);
	const $pageNumField = useStore(pageNum);
	const $searchField = useStore(search);

	const rows = env.PUBLIC_ROWS;

	// Create an asynchronous function to fetch the data
	const fetchData = async () => {
		try {
			const data = await fetchIndex();
			setData(data);
		} catch (error) {
			// Handle errors here, e.g., display an error message or log the error
			console.error("Error fetching data:", error);
		}
	};
	const fetchData2 = async () => {
		try {
			const data = await fetchBrowse($searchField, $pageNumField, $sortField);
			setData(data);
		} catch (error) {
			// Handle errors here, e.g., display an error message or log the error
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		fetchData();
		changeSearchStore("*:*");
		changePageNumStore(1);
		changeSortStore("default");
	}, []);

	useEffect(() => {
		fetchData2();
	}, [$searchField, $pageNumField]);

	return (
		<Suspense fallback={<Unfound />}>
			<ConfigProvider theme={theme}>
				<>
					<header>
						<h2 className="page-title">{metatags.pageTitle}</h2>
					</header>
					<br />
					<div className="item-list flex-container">
						{data?.response?.docs.map((document) => {
							return <SearchResult data={document} key={document.entity_id} />;
						})}
						<article className="item"></article>
						<article className="item"></article>
					</div>
					{data?.response?.numFound > rows && (
						<SearchPagination currentPage={$pageNumField} numFound={data?.response?.numFound} rows={rows} />
					)}
				</>
			</ConfigProvider>
		</Suspense>
	);
}

export default HomeBody;
