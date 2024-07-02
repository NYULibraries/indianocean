import { atom } from "nanostores";

const url = new URL(window.location.href);

const urlSortField = url.searchParams.get("sortField");

export const sort = atom(urlSortField ? urlSortField : "ss_longlabel");

export function changeSortStore(type) {
	sort.set(type);
}
