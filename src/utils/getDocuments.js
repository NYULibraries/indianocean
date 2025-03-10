import { sort } from "../stores/sortField";
import { env } from "../utils/Constants/env";

export async function fetchIndex() {
	try {
		// Try to get cached data first
		const cachedData = localStorage.getItem("indexCache");
		if (cachedData) {
			const parsed = JSON.parse(cachedData);
			const cacheTime = parsed.timestamp;
			// Cache for 1 hour (3600000 milliseconds)
			if (Date.now() - cacheTime < 3600000) {
				return parsed.data;
			}
		}

		// If no cache or expired, fetch new data
		const discoveryUrl = env.PUBLIC_DISCOVERYURL;
		const rows = 12;
		const start = 1;
		const collectionCode = env.PUBLIC_COLLECTIONCODE;
		const sortField = "ss_sauthor";
		const sortDir = "asc";
		const q = "*:*";
		const fl = "*";
		const apiUrl = `${discoveryUrl}/select?wt=json&q=${q}&fl=${fl}&fq=sm_collection_code:${collectionCode}&rows=${rows}&start=${start}&sort=${sortField}%20${sortDir}`;
		const response = await fetch(apiUrl);
		const data = await response.json();

		// Cache the new data
		localStorage.setItem(
			"indexCache",
			JSON.stringify({
				data,
				timestamp: Date.now()
			})
		);

		return data;
	} catch (e) {
		console.error(e);
		throw e;
	}
}
export async function fetchBrowse(search, pageNumber, sortType) {
	// Validate and sanitize pageNumber
	const validatedPage = Number(pageNumber) || 1; // Default to page 1 if invalid

	const discoveryUrl = env.PUBLIC_DISCOVERYURL;
	const rows = env.PUBLIC_ROWS;
	const start = (validatedPage - 1) * rows;
	const collectionCode = env.PUBLIC_COLLECTIONCODE;
	const language = env.PUBLIC_LANGUAGE;
	const fields = ["*"];
	const fl = fields.join();
	const sortDir = "asc";

	let apiUrl = `${discoveryUrl}/select?q=${search}&wt=json&q=*&fl=${fl}&fq=sm_collection_code:${collectionCode}&rows=${rows}&start=${start}&fq=ss_language:${language}&sort=${sortType}%20${sortDir}`;

	if (sortType === "default") {
		apiUrl = `${discoveryUrl}/select?q=${search}&wt=json&q=*&fl=${fl}&fq=sm_collection_code:${collectionCode}&rows=${rows}&start=${start}&fq=ss_language:${language}&%20${sortDir}`;
	}

	try {
		const response = await fetch(apiUrl);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (e) {
		console.error("Fetch error:", e);
		throw e;
	}
}
