import { changeSearchStore } from "../../../stores/search";
import { changePageNumStore } from "../../../stores/pageNum";

function SearchForm() {
	const appUrl = "";
	const actionPath = `${appUrl}/search`;
	// Get the URL of the current page
	const url = new URL(window.location.href);
	// Get the value of 'q' from the query string
	let value = url.searchParams.get("q") ? url.searchParams.get("q") : "";

	const handleSubmit = (e) => {
		e.preventDefault(); // Prevent the default form submission
		const searchQuery = e.target.elements.q.value;
		window.history.pushState(null, "", `${actionPath}?q=${searchQuery}`); // Update the URL
		changeSearchStore(searchQuery); // Update the search atom
		changePageNumStore(1); // Reset the page number atom
	};

	const title = "Enter the terms you wish to search for.";
	const label = "Search";
	const placeholder = "Search titles, subjects, authors...";
	if (value === "*:*") value = "";
	return (
		<form onSubmit={handleSubmit} role="search">
			<input
				id="q"
				name="q"
				type="text"
				defaultValue={value}
				placeholder={placeholder}
				title={title}
				aria-label={label}
			/>
			<input type="submit" className="submit-search" aria-label="Submit Search" />
		</form>
	);
}

export default SearchForm;
