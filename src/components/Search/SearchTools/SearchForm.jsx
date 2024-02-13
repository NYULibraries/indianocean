function SearchForm() {
	const appUrl = ''
	const actionPath = `${appUrl}/search`
	// Get the URL of the current page
	const url = new URL(window.location.href)
	// Get the value of 'q' from the query string
	let value = url.searchParams.get('q') ? url.searchParams.get('q') : ''
	const title = 'Enter the terms you wish to search for.'
	const label = 'Search'
	const planceholder = 'Search titles, subjects, authors...'
	if (value === '*:*') {
		value = ''
	}
	return (
		<form method="get" action={actionPath} role="search">
			<input
				id="q"
				name="q"
				type="text"
				defaultValue={value}
				placeholder={planceholder}
				title={title}
				aria-label={label}
			/>
			<input type="submit" className="submit-search" aria-label="Submit Search" />
		</form>
	)
}

export default SearchForm
