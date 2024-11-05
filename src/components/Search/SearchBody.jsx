import { useState, useEffect, Suspense } from "react";
import { useStore } from "@nanostores/react";
import { sort, changeSortStore, changeSortSubjectStore, sortedBySubject } from "../../stores/sortField";
import { pageNum, changePageNumStore } from "../../stores/pageNum";
import { search, changeSearchStore } from "../../stores/search";
import { ConfigProvider } from "antd";
import SearchResult from "./SearchResult";
import SearchHeader from "./SearchLabels/SearchHeader";
import SearchSubheader from "./SearchLabels/SearchSubheader";
import SearchPagination from "./SearchTools/SearchPagination";
import Unfound from "../Unfound";
import theme from "../Styles/themeConfig";
import { env } from "../../utils/Constants/env";
import { fetchBrowse } from "../../utils/getDocuments";
import { updateUrl } from "../../utils/url";

function SearchBody() {
	const [data, setData] = useState([{}]);

	const $sortField = useStore(sort);
	const $searchField = useStore(search);
	const $pageNumField = useStore(pageNum);
	const $sortedBySubject = useStore(sortedBySubject);

	const rows = env.PUBLIC_ROWS;

	const fetchData = async () => {
		try {
			const data = await fetchBrowse($searchField, $pageNumField, $sortField);
			setData(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		const handleNavigation = (event) => {
			const state = event?.state;
			if (state) {
				changeSearchStore(state.search);
				changePageNumStore(state.page);
				changeSortStore(state.sortType);
			} else {
				const urlParams = new URLSearchParams(window.location.search);
				const search = decodeURIComponent(urlParams.get("q")) || "*:*";
				const page = parseInt(urlParams.get("page")) || 1;
				const sortField = urlParams.get("sortField") || "default";

				changeSearchStore(search);
				changePageNumStore(page);
				changeSortStore(sortField);
			}
			fetchData();
		};

		// Listen for both popstate (back/forward) and pushstate events
		window.addEventListener("popstate", handleNavigation);

		// Initial load
		const urlParams = new URLSearchParams(window.location.search);
		if (urlParams.has("q")) {
			handleNavigation({ state: null });
		}

		return () => {
			window.removeEventListener("popstate", handleNavigation);
		};
	}, []);

	useEffect(() => {
		updateUrl($searchField, $pageNumField, $sortField);
		fetchData();
		changeSortSubjectStore(false);
		const subjects = document.querySelectorAll(".md_subject");
		subjects.forEach((subject) => {
			if ($sortedBySubject) {
				return;
			}
			if ($searchField == subject.textContent) {
				changeSortSubjectStore(true);
			}
		});
	}, [$searchField, $pageNumField, $sortField]);

	return (
		<Suspense fallback={<Unfound />}>
			<ConfigProvider theme={theme}>
				<>
					<header>
						<SearchHeader query={$searchField} />
						{data?.response && <SearchSubheader response={data} />}
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

export default SearchBody;
