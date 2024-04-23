import { useState, useEffect, Suspense } from "react";
import { useStore } from "@nanostores/react";
import { sort } from "../../stores/sortField";
import { ConfigProvider } from "antd";
import SearchResult from "./SearchResult";
import SearchHeader from "./SearchLabels/SearchHeader";
import SearchSubheader from "./SearchLabels/SearchSubheader";
import SearchPagination from "./SearchTools/SearchPagination";
import Unfound from "../Unfound";
import theme from "../Styles/themeConfig";
import FilterDropdown from "../Content/Filter/FilterDropdown";
import { search, pageNumber } from "../../utils/url";
import { env } from "../../utils/Constants/env";
import { fetchBrowse } from "../../utils/getDocuments";

function SearchBody() {
	const [data, setData] = useState([]);

	const $sortField = useStore(sort);

	const rows = env.PUBLIC_ROWS;

	// Create an asynchronous function to fetch the data
	const fetchData = async () => {
		try {
			const data = await fetchBrowse(search, pageNumber, $sortField);
			setData(data);
			console.log(data);
		} catch (error) {
			// Handle errors here, e.g., display an error message or log the error
			console.error("Error fetching data:", error);
		}
	};

	// Use the useEffect hook to fetch data when the component mounts
	useEffect(() => {
		fetchData();
	}, [$sortField]); // The empty dependency array ensures this effect runs once when the component mounts

	return (
		<Suspense fallback={<Unfound />}>
			<ConfigProvider theme={theme}>
				<>
					<header>
						{data?.response?.numFound > 0 && <FilterDropdown />}
						<SearchHeader query={search} />
						<SearchSubheader response={data} />
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
						<SearchPagination currentPage={pageNumber} numFound={data?.response?.numFound} rows={rows} />
					)}
				</>
			</ConfigProvider>
		</Suspense>
	);
}

export default SearchBody;
