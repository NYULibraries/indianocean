// Get the URL of the current page
export function updateUrl(search, page, sortType) {
	window.history.pushState(
		{},
		"",
		`/search?q=${search == "*:*" ? "*:*" : encodeURIComponent(search)}&page=${encodeURIComponent(page)}&sortField=${encodeURIComponent(sortType)}&sortDir=${"asc"}`
	);
}
