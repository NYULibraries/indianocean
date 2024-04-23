import { env } from "../utils/Constants/env";

export async function fetchIndex() {
	try {
		const discoveryUrl = env.PUBLIC_DISCOVERYURL;
		const rows = env.PUBLIC_ROWS;
		const start = 1;
		const collectionCode = env.PUBLIC_COLLECTIONCODE;
		const sortField = "ss_sauthor";
		const sortDir = "asc";
		const q = "*:*";
		const fl = "*";
		const apiUrl = `${discoveryUrl}/select?wt=json&q=${q}&fl=${fl}&fq=sm_collection_code:${collectionCode}&rows=${rows}&start=${start}&sort=${sortField}%20${sortDir}`;
		const response = await fetch(apiUrl);
		const data = await response.json();
		return data;
	} catch (e) {
		console.error(e);
		throw e;
	}
}
export async function fetchBrowse(search, pageNumber, sortType) {
	try {
		const discoveryUrl = env.PUBLIC_DISCOVERYURL;
		const rows = env.PUBLIC_ROWS;
		const start = (pageNumber - 1) * rows;
		const collectionCode = env.PUBLIC_COLLECTIONCODE;
		const language = env.PUBLIC_LANGUAGE;
		const fields = ["*"];
		const fl = fields.join();
		const sortDir = "asc";
		const apiUrl = `${discoveryUrl}/select?q=${search}&wt=json&q=*&fl=${fl}&fq=sm_collection_code:${collectionCode}&rows=${rows}&start=${start}&fq=ss_language:${language}&sort=${sortType}%20${sortDir}`;
		const response = await fetch(apiUrl);
		const data = await response.json();
		return data;
	} catch (e) {
		console.error(e);
		throw e;
	}
}
