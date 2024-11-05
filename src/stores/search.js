import { atom } from "nanostores";

const url = new URL(window.location.href);
const urlSearchField = url.searchParams.get("q");
const storedSearch = sessionStorage.getItem("searchField");

export const search = atom(storedSearch || urlSearchField || "*:*");

export function changeSearchStore(type) {
	search.set(type);
	sessionStorage.setItem("searchField", type);
}
