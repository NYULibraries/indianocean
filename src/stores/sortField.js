import { atom } from "nanostores";
import { url } from "../utils/url";

const urlSortField = url.searchParams.get("sortField");

export const sort = atom(urlSortField ? urlSortField : "ss_longlabel");

export function changeSortStore(type) {
	sort.set(type);
}
