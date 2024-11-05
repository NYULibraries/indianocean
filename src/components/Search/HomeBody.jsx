import { useState, useEffect, Suspense } from "react";
import { ConfigProvider } from "antd";
import SearchResult from "./SearchResult";
import Unfound from "../Unfound";
import theme from "../Styles/themeConfig";
import { fetchIndex } from "../../utils/getDocuments";
import { metatags } from "../../utils/Constants/metatags";

function HomeBody() {
	const [data, setData] = useState([{}]);

	const initialFetch = async () => {
		try {
			const cachedData = localStorage.getItem('indexCache');
			if (cachedData) {
				const parsed = JSON.parse(cachedData);
				setData(parsed.data);
				
				// one hour cache
				if (Date.now() - parsed.timestamp > 3600000) {
					const freshData = await fetchIndex();
					setData(freshData);
				}
			} else {
				const freshData = await fetchIndex();
				setData(freshData);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		initialFetch();
	}, []);

	return (
		<Suspense fallback={<Unfound />}>
			<ConfigProvider theme={theme}>
				<>
					<header>
						<h2 className="page-title">{metatags.pageTitle}</h2>
					</header>
					<br />
					<div className="item-list flex-container">
						{data?.response?.docs.map((document) => {
							return <SearchResult data={document} key={document.entity_id} />;
						})}
						<article className="item"></article>
						<article className="item"></article>
					</div>
				</>
			</ConfigProvider>
		</Suspense>
	);
}

export default HomeBody;
