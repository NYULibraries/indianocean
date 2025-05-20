export function updateUrl(search, page, sortType) {
	// Handle initial /search redirect
	if (
		(window.location.pathname === '/search' || window.location.pathname === '/search/') &&
		(!window.location.search || window.location.search === '?q=*:*&page=1&sortField=default&sortDir=asc') &&
		search === '*:*' &&
		page === 1 &&
		sortType === 'default'
	) {
		const initialState = {
			search: '*:*',
			page: 1,
			sortType: 'default'
		};

		window.history.replaceState(initialState, '', `/search?q=*:*&page=1&sortField=default&sortDir=asc`);
		return;
	}

	const state = {
		search: search || '*:*',
		page: page || 1,
		sortType: sortType || 'default'
	};

	// Always use replaceState instead of pushState to avoid duplicate entries
	window.history.replaceState(
		state,
		'',
		`/search?q=${state.search === '*:*' ? '*:*' : encodeURIComponent(state.search)}&page=${encodeURIComponent(state.page)}&sortField=${encodeURIComponent(state.sortType)}&sortDir=asc`
	);
}
