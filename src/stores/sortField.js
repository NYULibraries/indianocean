import { atom } from "nanostores";

const url = new URL(window.location.href);
const urlSortField = url.searchParams.get("sortField");
const storedSort = sessionStorage.getItem("sortField");

export const sort = atom(storedSort || urlSortField || "default");

export function changeSortStore(type) {
	sort.set(type);
	sessionStorage.setItem("sortField", type);
}

export const sortedBySubject = atom(true);

export function changeSortSubjectStore(type) {
	sortedBySubject.set(type);
}
