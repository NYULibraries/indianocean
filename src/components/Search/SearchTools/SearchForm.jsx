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

		// Check current route
		const currentPath = window.location.pathname;

		// Create the state object that will be used for both redirect and pushState
		const newState = {
			search: searchQuery,
			page: 1,
			sortType: "default"
		};

		// Create the new URL
		const newUrl = `/search?q=${encodeURIComponent(searchQuery)}`;

		if (currentPath === "/" || currentPath.includes("/book/") || currentPath.includes("/map/")) {
			sessionStorage.setItem("searchField", searchQuery);
			sessionStorage.setItem("pageNum", "1");
			sessionStorage.setItem("sortField", "default");
			window.location.href = newUrl;
			return;
		}

		// For the search page itself, use pushState
		window.history.pushState(newState, "", newUrl);
		window.dispatchEvent(
			new PopStateEvent("popstate", {
				state: newState
			})
		);
	};

	useEffect(() => {
		// Only update input value on search page
		if (window.location.pathname === "/search" && inputRef.current && $searchField) {
			if ($searchField === "*:*") {
				inputRef.current.value = "";
			} else {
				inputRef.current.value = $searchField;
			}
		}
	}, [$searchField]);

	return (
		<form onSubmit={handleSubmit} role="search">
			<input
				id="q"
				name="q"
				type="text"
				defaultValue={window.location.pathname === "/search" ? ($searchField === "*:*" ? "" : $searchField) : ""}
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
