import { atom } from "nanostores";

const url = new URL(window.location.href);

const urlSortField = url.searchParams.get("sortField");

export const sort = atom(urlSortField ? urlSortField : "default");

export function changeSortStore(type) {
	sort.set(type);
}

export const sortedBySubject = atom(true);

export function changeSortSubjectStore(type) {
	sortedBySubject.set(type);
}
