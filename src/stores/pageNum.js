import { atom } from "nanostores";

const url = new URL(window.location.href);

const pageNumField = url.searchParams.get("page");

export const pageNum = atom(pageNumField ? parseInt(url.searchParams.get("page"), 10) : 1);

export function changePageNumStore(type) {
	pageNum.set(type);
}
