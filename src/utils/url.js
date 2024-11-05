// Get the URL of the current page
export function updateUrl(search, page, sortType) {
	// Handle initial /search redirect
	if (window.location.pathname === "/search" && !window.location.search) {
		const initialState = {
			search: "*:*",
			page: 1,
			sortType: "default"
		};

		// Replace the current history entry instead of pushing a new one
		window.history.replaceState(initialState, "", `/search?q=*:*&page=1&sortField=default&sortDir=asc`);
		return;
	}

	// Regular URL update logic
	const currentParams = new URLSearchParams(window.location.search);
	const currentSearch = decodeURIComponent(currentParams.get("q")) || "*:*";
	const currentPage = parseInt(currentParams.get("page")) || 1;
	const currentSort = currentParams.get("sortField") || "default";

	// If nothing has changed, don't create a new history entry
	if (currentSearch === search && currentPage === page && currentSort === sortType) {
		return;
	}

	const state = {
		search: search || "*:*",
		page: page || 1,
		sortType: sortType || "default"
	};

	window.history.pushState(
		state,
		"",
		`/search?q=${state.search === "*:*" ? "*:*" : encodeURIComponent(state.search)}&page=${encodeURIComponent(state.page)}&sortField=${encodeURIComponent(state.sortType)}&sortDir=${"asc"}`
	);
}
