import { useState, useEffect, Suspense } from "react";
import { useStore } from "@nanostores/react";
import { sort, changeSortStore, changeSortSubjectStore, sortedBySubject } from "../../stores/sortField";
import { pageNum, changePageNumStore } from "../../stores/pageNum";
import { search, changeSearchStore } from "../../stores/search";
import { ConfigProvider } from "antd";
import SearchResult from "./SearchResult";
import SearchPagination from "./SearchTools/SearchPagination";
import Unfound from "../Unfound";
import theme from "../Styles/themeConfig";
import { env } from "../../utils/Constants/env";
import { fetchBrowse, fetchIndex } from "../../utils/getDocuments";
import { updateUrl } from "../../utils/url";
import { metatags } from "../../utils/Constants/metatags";

function HomeBody() {
	const [data, setData] = useState([{}]);

	const $sortField = useStore(sort);
	const $searchField = useStore(search);
	const $pageNumField = useStore(pageNum);
	const $sortedBySubject = useStore(sortedBySubject);

	const rows = env.PUBLIC_ROWS;

	const initialFetch = async () => {
		try {
			const data = await fetchIndex();
			setData(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const fetchData = async () => {
		try {
			const data = await fetchBrowse($searchField, $pageNumField, $sortField);
			setData(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		const storedSort = sessionStorage.getItem("sortField");
		const storedSearch = sessionStorage.getItem("searchField");
		const storedPage = parseInt(sessionStorage.getItem("pageNum"));

		if (storedSort && storedSearch && !isNaN(storedPage)) {
			changeSortStore(storedSort);
			changeSearchStore(storedSearch);
			changePageNumStore(storedPage);
		}

		// Run initialFetch if searchField is empty
		if (!storedSearch) {
			initialFetch();
		}

		const handlePopState = () => {
			const urlParams = new URLSearchParams(window.location.search);
			const search = decodeURIComponent(urlParams.get("q")) || "";
			const page = parseInt(urlParams.get("page")) || 1;
			const sortField = urlParams.get("sortField") || "";

			changeSearchStore(search);
			changePageNumStore(page);
			changeSortStore(sortField);
		};
		window.addEventListener("popstate", handlePopState);

		return () => {
			window.removeEventListener("popstate", handlePopState);
		};
	}, []);

	useEffect(() => {
		sessionStorage.setItem("sortField", $sortField);
		sessionStorage.setItem("searchField", $searchField);
		sessionStorage.setItem("pageNum", $pageNumField);
		
		if ($searchField !== '*:*' && $searchField !== '' &&
			$pageNumField !== undefined && $pageNumField !== '' &&
			$sortField !== undefined && $sortField !== '') {
			updateUrl($searchField, $pageNumField, $sortField);
			fetchData();
		} else {
			initialFetch();
		}
		
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
