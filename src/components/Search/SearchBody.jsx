import { useState, useEffect, Suspense } from "react";
import { ConfigProvider } from "antd";
import SearchResult from "./SearchResult";
import SearchHeader from "./SearchLabels/SearchHeader";
import ResultsFound from "./ResultsFound";
import SearchPagination from "./SearchTools/SearchPagination";
import Unfound from "../Unfound";
import theme from "../Styles/themeConfig";
import FilterDropdown from "../Content/Filter/FilterDropdown";
import { fetchBrowse } from "../../utils/getDocuments";
import getHashParams from "../../utils/getHashParams";

function NoResultsFound() {
    return (
        <>
            <div className="col">
                <p>Sorry, no results found.</p>
			    <p>Try a different term.</p>
		    </div>
        </>
    )
}

function SearchBody() {
	const [items, setItems] = useState([]);
    const [ pageNumber, setPageNumber ] = useState(1);
    const [ numFound, setNumFound ] = useState(0);
    const [ rows, setRows ] = useState(10);
    const [ search, setSearch ] = useState('');

	// Create an asynchronous function to fetch the data
	const fetchData = async () => {
		try {
            const params = getHashParams();
			const data = await fetchBrowse(params);
            setSearch(data.responseHeader.params.q[0]);
            setRows(data.responseHeader.params.rows);
            setNumFound(data.response.numFound);
            window.scrollTo({ top: 0, behavior: 'smooth'});
			setItems(data.response.docs);
		} catch (error) {
			// Handle errors here, e.g., display an error message or log the error
			console.error("Error fetching data:", error);
		}
	};

	// Use the useEffect hook to fetch data when the component mounts
	useEffect(() => {
		fetchData();
	}, []); // The empty dependency array ensures this effect runs once when the component mounts

    window.addEventListener("popstate", fetchData);

	return (
		<Suspense fallback={<Unfound />}>
			<ConfigProvider theme={theme}>
				<>
					<header>
						{ numFound > 0 && <FilterDropdown /> }
						<SearchHeader query={search} />
                        { numFound < 1 ? <NoResultsFound/> : <ResultsFound numFound={numFound} start={pageNumber} documentsLength={items.length} /> }
					</header>
					<br />
					<div className="item-list flex-container">
						{
                            items.map((item) => {
							    return <SearchResult data={item} key={item.entity_id} />;
						    })
                        }
						<article className="item"></article>
						<article className="item"></article>
					</div>
					{numFound > rows && (
						<SearchPagination currentPage={pageNumber} numFound={numFound} rows={rows} />
					)}
				</>
			</ConfigProvider>
		</Suspense>
	);
}

export default SearchBody;
