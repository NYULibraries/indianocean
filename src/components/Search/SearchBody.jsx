import { useState, useEffect, Suspense } from 'react'

import SearchResult from './SearchResult'

import { Pagination, Spin, ConfigProvider } from 'antd'

import theme from '../Styles/themeConfig'

import FilterDropdown from '../Content/FilterDropdown'

import { sort } from '../../stores/sortField'

import { useStore } from "@nanostores/react"

import { search, pageNumber, defaultQuery } from '../../utils/url'

export function Loading(){
	return <div>Loading...</div>
}

function SearchBody () {

  const [documents, setDocuments] = useState([])

	const [numFound, setNumFound] = useState([])

	const [sortDir, setSortDir] = useState('asc')

	const $sortField = useStore(sort)

	const onChange = (page) => {
		console.log($sortField)
		window.location.href = `/search?q=${search}&page=${page}&sortField=${$sortField}&sortDir=${sortDir}`
  }

  // Create an asynchronous function to fetch the data
  const fetchData = async () => {
    try {

			const discoveryUrl = 'https://discovery1.dlib.nyu.edu/solr/viewer'

			const rows = 12

			const start = (pageNumber - 1) * rows

			const collectionCode = 'io'

			const language = 'en'

			// const fields = [
			// 	'entity_id',
			// 	'bundle',
			// 	'ss_language',
			// 	'ss_noid',
			// 	'ss_manifest',
			// 	'ss_title_long',
			// 	'ss_subtitle',
			// 	'sm_author',
			// 	'iass_pubyear',
			// 	'ss_publication_date_text',
			// 	'ss_publication_location',
			// 	'iass_subject',
			// 	'sm_field_identifier',
			// ]

			const fields = [ '*' ]

			const fl = fields.join()

			const apiUrl = `${discoveryUrl}/select?q=${search}&wt=json&q=*&fl=${fl}&fq=sm_collection_code:${collectionCode}&rows=${rows}&start=${start}&fq=ss_language:${language}&sort=${$sortField}%20${sortDir}`

			const response = await fetch(apiUrl)

			const data = await response.json()

      setDocuments(data.response.docs)

			setNumFound(data.response.numFound)

    } catch (error) {
      // Handle errors here, e.g., display an error message or log the error
      console.error('Error fetching data:', error);
    }
  }

  // Use the useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchData()
  }, [$sortField]) // The empty dependency array ensures this effect runs once when the component mounts

	return (
		<Suspense fallback={<Loading/>}>
			<ConfigProvider theme={theme}>
		<div>
			<FilterDropdown/>
			{documents ? (
			<>
        {search !== defaultQuery ? (
          <h2 className="page-title">Search Results for: <span className="s-query">{search}</span></h2>
        ) : (
          <h2 className="page-title">Browse titles</h2>
        )}
        <div className="item-list flex-container">
        {
          documents.map(document => {
						return (
              <SearchResult data={document} key={document.entity_id}/>
            )
					}
				)
      }
      <article className="item"></article>
      <article className="item"></article>
    </div>
		{numFound > 12 && (
      <Pagination
        current={pageNumber}
        onChange={onChange}
        showSizeChanger={false}
        pageSize={12}
        hideOnSinglePage={true}
        total={numFound}
				style={{textAlign:'center'}}
      />
    )}
			</>
			) : (
        <div>Loading...</div>
      )}
		</div>
		</ConfigProvider>
		</Suspense>
	)

}

export default SearchBody
