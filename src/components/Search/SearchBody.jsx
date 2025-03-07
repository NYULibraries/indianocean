import { useState, useEffect, Suspense } from "react";
import { useStore } from "@nanostores/react";
import { sort, changeSortStore, changeSortSubjectStore, sortedBySubject, resetSort } from "../../stores/sortField";
import { pageNum, changePageNumStore, resetPage } from "../../stores/pageNum";
import { search, changeSearchStore, resetSearch } from "../../stores/search";
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

			// Check if we're at search root (no query params) or default query
			const urlParams = new URLSearchParams(window.location.search);
			const isDefaultQuery =
				urlParams.get("q") === "*:*" &&
				(urlParams.get("page") === "1" || !urlParams.get("page")) &&
				(urlParams.get("sortField") === "default" || !urlParams.get("sortField")) &&
				(urlParams.get("sortDir") === "asc" || !urlParams.get("sortDir"));

			if (!window.location.search || isDefaultQuery) {
				resetSearch(); // sets search to "*:*"
				resetPage(); // sets page to 1
				resetSort(); // sets sort to "default" and sortedBySubject to true
				console.log("a");
				return;
			}

			if (state) {
				changeSearchStore(state.search);
				changePageNumStore(state.page);
				changeSortStore(state.sortType);
				fetchBrowse(state.search, state.page, state.sortType)
					.then(setData)
					.catch((error) => console.error("Error fetching data:", error));
			} else {
				const search = urlParams.has("q") ? decodeURIComponent(urlParams.get("q")) : "*:*";
				const page = parseInt(urlParams.get("page")) || 1;
				const sortField = urlParams.get("sortField") || "default";

				changeSearchStore(search);
				changePageNumStore(page);
				changeSortStore(sortField);
				fetchBrowse(search, page, sortField)
					.then(setData)
					.catch((error) => console.error("Error fetching data:", error));
			}
		};

		// Always set up the popstate listener first
		window.addEventListener("popstate", handleNavigation);

		// Check for session storage
		const savedSearch = sessionStorage.getItem("searchField");
		if (savedSearch) {
			// Handle initial load with session storage
			const savedPage = sessionStorage.getItem("pageNum");
			const savedSort = sessionStorage.getItem("sortField");

			changeSearchStore(savedSearch);
			changePageNumStore(parseInt(savedPage) || 1);
			changeSortStore(savedSort || "default");

			fetchBrowse(savedSearch, parseInt(savedPage) || 1, savedSort || "default")
				.then((data) => {
					setData(data);
					// Clear session storage after successful fetch
					sessionStorage.removeItem("searchField");
					sessionStorage.removeItem("pageNum");
					sessionStorage.removeItem("sortField");
				})
				.catch((error) => console.error("Error fetching data:", error));
		} else {
			// Handle initial load without session storage
			handleNavigation({ state: null });
		}

		return () => {
			window.removeEventListener("popstate", handleNavigation);
			resetSort();
			resetPage();
			resetSearch();
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
