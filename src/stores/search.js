import { atom } from "nanostores";

// Get initial state from URL on page load/refresh
function getInitialSearch() {
	console.log("Initializing search store");
	try {
		const url = new URL(window.location.href);
		return url.searchParams.get("q") || "*:*";
	} catch {
		return "*:*";
	}
}

export const search = atom(getInitialSearch());

export function changeSearchStore(type) {
	console.log("Changing search store to:", type);
	search.set(type);
}

export function resetSearch() {
	search.set("*:*");
}
