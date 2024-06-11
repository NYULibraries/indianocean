import { atom } from "nanostores";
import { url } from "../utils/url";

const urlSearchField = url.searchParams.get("q");

export const search = atom(urlSearchField ? url.SearchField : "*:*");

export function changeSearchStore(type) {
	search.set(type);
}
