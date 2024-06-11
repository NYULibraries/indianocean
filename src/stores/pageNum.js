import { atom } from "nanostores";
import { url } from "../utils/url";

const pageNumField = url.searchParams.get("page");

export const pageNum = atom(pageNumField ? parseInt(url.searchParams.get("page"), 10) : 1);

export function changePageNumStore(type) {
	pageNum.set(type);
}
