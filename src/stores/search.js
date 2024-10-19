import { atom } from "nanostores";

const url = new URL(window.location.href);

const urlSearchField = url.searchParams.get("q");

export const search = atom(urlSearchField ? url.SearchField : "*:*");

export function changeSearchStore(type) {
	search.set(type);
}
