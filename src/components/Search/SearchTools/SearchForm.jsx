import { search, changeSearchStore } from "../../../stores/search";
import { changePageNumStore } from "../../../stores/pageNum";
import { useStore } from "@nanostores/react";
import { useEffect, useRef, StrictMode } from "react";

function SearchForm() {
	console.log('SearchForm mounting');
	const $searchField = useStore(search);

	const inputRef = useRef(null);

	const title = "Enter the terms you wish to search for.";
	const label = "Search";
	const placeholder = "Search titles, subjects, authors...";

	useEffect(() => {
		console.log('SearchForm initialized');
		return () => {
			console.log('SearchForm cleanup');
		};
	}, []);

	const handleSubmit = (e) => {
		console.log('Form submission with value:', e.target.elements.q.value);
		e.preventDefault();
		const searchQuery = e.target.elements.q.value ? e.target.elements.q.value : "*:*";
		if (inputRef.current) {
			inputRef.current.blur();
		}
		changeSearchStore(searchQuery);
		changePageNumStore(1);
		const newUrl = `/search?q=${encodeURIComponent(searchQuery)}`;
		window.history.pushState(
			{ search: searchQuery, page: 1, sortType: "default" },
			"",
			newUrl
		);
		window.dispatchEvent(new PopStateEvent('popstate', { 
			state: { search: searchQuery, page: 1, sortType: "default" }
		}));
	};

	useEffect(() => {
		console.log('SearchForm useEffect running with searchField:', $searchField);
		if (inputRef.current && $searchField != "*:*" && $searchField) {
			inputRef.current.value = $searchField;
		}
	}, [$searchField]);

	return (
		<StrictMode>
			<form onSubmit={handleSubmit} role="search">
				<input
					id="q"
					name="q"
					type="text"
					defaultValue={$searchField == "*:*" ? "" : $searchField}
					placeholder={placeholder}
					title={title}
					aria-label={label}
					ref={inputRef}
				/>
				<input type="submit" className="submit-search" aria-label="Submit Search" />
			</form>
		</StrictMode>
	);
}

export default SearchForm;
