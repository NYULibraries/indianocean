import getHashParams from "./getHashParams";

export const defaultParams = {
    q: "*:*",
	page: 1,
	rows: import.meta.env.PUBLIC_ROWS,
	sortType: "ss_sauthor",
	sortDir: "asc"
};

export async function fetchIndex() {
	try {
        const params = getHashParams();
		const discoveryUrl = import.meta.env.PUBLIC_DISCOVERYURL;
		const rows = (params.rows) ? params.rows : import.meta.env.PUBLIC_ROWS;
		const start = 1;
		const collectionCode = import.meta.env.PUBLIC_COLLECTIONCODE;
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

export async function fetchBrowse(params) {
	try {
        let merged = {...defaultParams, ...params};
		const discoveryUrl = import.meta.env.PUBLIC_DISCOVERYURL;
        const collectionCode = import.meta.env.PUBLIC_COLLECTIONCODE;
        const language = import.meta.env.PUBLIC_LANGUAGE;
		const start = (((merged.page) ? merged.page : 1) - 1) * merged.rows;
		const fields = [ "*" ];
		const fl = fields.join();
		const apiUrl = `${discoveryUrl}/select?q=${merged.q}&wt=json&q=*&fl=${fl}&fq=sm_collection_code:${collectionCode}&rows=${merged.rows}&start=${start}&fq=ss_language:${language}&sort=${merged.sortType}%20${merged.sortDir}`;
		const response = await fetch(apiUrl);
		const data = await response.json();
		return data;
	} catch (e) {
		console.error(e);
		throw e;
	}
}
