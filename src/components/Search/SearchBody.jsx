import React from 'react'
import { useState, useEffect, Suspense } from 'react'
import { useStore } from '@nanostores/react'
import { sort } from '../../stores/sortField'
import { ConfigProvider } from 'antd'
import SearchResult from './SearchResult'
import SearchHeader from './SearchLabels/SearchHeader'
import SearchSubheader from './SearchLabels/SearchSubheader'
import SearchPagination from './SearchTools/SearchPagination'
import Loading from '../Loading'
import theme from '../Styles/themeConfig'
import FilterDropdown from '../Content/Filter/FilterDropdown'
import { search, pageNumber } from '../../utils/url'

function SearchBody() {
	const [data, setData] = useState([])

	const $sortField = useStore(sort)

	const rows = import.meta.env.PUBLIC_ROWS

	// Create an asynchronous function to fetch the data
	const fetchData = async () => {
		try {
			const discoveryUrl = import.meta.env.PUBLIC_DISCOVERYURL

			const rows = import.meta.env.PUBLIC_ROWS

			const start = (pageNumber - 1) * rows

			const collectionCode = import.meta.env.PUBLIC_COLLECTIONCODE

			const language = import.meta.env.PUBLIC_LANGUAGE

			const fields = ['*']

			const fl = fields.join()

			const sortDir = 'asc'

			const apiUrl = `${discoveryUrl}/select?q=${search}&wt=json&q=*&fl=${fl}&fq=sm_collection_code:${collectionCode}&rows=${rows}&start=${start}&fq=ss_language:${language}&sort=${$sortField}%20${sortDir}`

			const response = await fetch(apiUrl)

			const data = await response.json()

			setData(data)
		} catch (error) {
			// Handle errors here, e.g., display an error message or log the error
			console.error('Error fetching data:', error)
		}
	}

	// Use the useEffect hook to fetch data when the component mounts
	useEffect(() => {
		fetchData()
	}, [$sortField]) // The empty dependency array ensures this effect runs once when the component mounts

	return (
		<Suspense fallback={<Loading />}>
			<ConfigProvider theme={theme}>
				<>
					<header>
						{data?.response?.numFound > 0 && <FilterDropdown />}
						<SearchHeader query={search} />
						<SearchSubheader response={data} />
					</header>
					<br />
					<div className="item-list flex-container">
						{data?.response?.docs.map((document) => (
							<SearchResult data={document} key={document.entity_id} />
						))}
						<article className="item"></article>
						<article className="item"></article>
					</div>
					{data?.response?.numFound > rows && (
						<SearchPagination currentPage={pageNumber} numFound={data?.response?.numFound} rows={rows} />
					)}
				</>
			</ConfigProvider>
		</Suspense>
	)
}

export default SearchBody
