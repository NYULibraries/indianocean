import { atom } from "nanostores";

// Get initial state from URL on page load/refresh
function getInitialSort() {
	try {
		const url = new URL(window.location.href);
		return url.searchParams.get("sortField") || "default";
	} catch {
		return "default";
	}
}

export const sort = atom(getInitialSort());
export const sortedBySubject = atom(true);

export function changeSortStore(type) {
	sort.set(type);
}

export function changeSortSubjectStore(type) {
	sortedBySubject.set(type);
}

export function resetSort() {
	sort.set("default");
	sortedBySubject.set(true);
}
