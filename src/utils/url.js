// Get the URL of the current page
export function updateUrl(search, page, sortType) {
	const defaultSearch = search || "*:*";
	const defaultPage = page || 1;
	const defaultSort = sortType || "default";
	window.history.pushState(
		{},
		"",
		`/search?q=${defaultSearch == "*:*" ? "*:*" : encodeURIComponent(defaultSearch)}&page=${encodeURIComponent(defaultPage)}&sortField=${encodeURIComponent(defaultSort)}&sortDir=${"asc"}`
	);
}
