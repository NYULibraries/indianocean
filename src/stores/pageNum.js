import { atom } from "nanostores";

const url = new URL(window.location.href);
const pageNumField = url.searchParams.get("page");
const storedPage = parseInt(sessionStorage.getItem("pageNum"), 10);

export const pageNum = atom(storedPage || pageNumField ? parseInt(pageNumField, 10) : 1);

export function changePageNumStore(type) {
	pageNum.set(type);
	sessionStorage.setItem("pageNum", type);
}
