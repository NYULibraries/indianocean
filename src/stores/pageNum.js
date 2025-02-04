import { atom } from "nanostores";

// Get initial state from URL on page load/refresh
function getInitialPage() {
	try {
		const url = new URL(window.location.href);
		const pageParam = url.searchParams.get("page");
		return pageParam ? parseInt(pageParam, 10) : 1;
	} catch {
		return 1;
	}
}

export const pageNum = atom(getInitialPage());

export function changePageNumStore(type) {
	pageNum.set(type);
}

export function resetPage() {
	pageNum.set(1);
}
