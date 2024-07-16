import { search, changeSearchStore } from "../../../stores/search";
import { changePageNumStore } from "../../../stores/pageNum";
import { useStore } from "@nanostores/react";
import { useEffect, useRef } from "react";

function SearchForm() {
	const $searchField = useStore(search);

	const inputRef = useRef(null);

	const title = "Enter the terms you wish to search for.";
	const label = "Search";
	const placeholder = "Search titles, subjects, authors...";

	const handleSubmit = (e) => {
		e.preventDefault();
		const searchQuery = e.target.elements.q.value ? e.target.elements.q.value : "*:*";
		if (inputRef.current) {
			inputRef.current.blur();
		}
		changeSearchStore(searchQuery);
		changePageNumStore(1);
	};

	useEffect(() => {
		if (inputRef.current && $searchField != "*:*" && $searchField) {
			inputRef.current.value = $searchField;
		}
	}, [$searchField]);

	return (
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
	);
}

export default SearchForm;
