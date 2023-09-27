import { useState, useEffect } from 'react'

import SearchResult from './SearchResult'

import { Pagination } from 'antd'

function SearchBody () {

  const [documents, setDocuments] = useState([])

	const [numFound, setNumFound] = useState([])

	const onChange = (page) => {

		const sortField = 'ss_sauthor'

		const sortDir = 'asc'

		window.location.href = `/search?q=${search}&page=${page}&sortField=${sortField}&sortDir=${sortDir}`

  }

  // Create an asynchronous function to fetch the data
  const fetchData = async () => {
    try {

			const discoveryUrl = 'https://discovery1.dlib.nyu.edu/solr/viewer'

			const rows = 12

			const start = (pageNumber - 1) * rows

			const collectionCode = 'io'

			const sortField = 'ss_sauthor'

			const sortDir = 'asc'

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

			const apiUrl = `${discoveryUrl}/select?q=${search}&wt=json&q=*&fl=${fl}&fq=sm_collection_code:${collectionCode}&rows=${rows}&start=${start}&fq=ss_language:${language}&sort=${sortField}%20${sortDir}`

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
  }, []) // The empty dependency array ensures this effect runs once when the component mounts

	const defaultQuery = '*:*'

  // Get the URL of the current page
  const url = new URL(window.location.href)

	const search = url.searchParams.get('q') ? url.searchParams.get('q') : defaultQuery

  // Get the value of 'q' from the query string
  const pageNumber = url.searchParams.get('page') ? parseInt(url.searchParams.get('page'), 10) : 1

	return (
		<div>
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
              <SearchResult data={document}/>
            )
					}
				)
      }
      <article class="item"></article>
      <article class="item"></article>
    </div>
		{numFound > 12 && (
      <Pagination
        current={pageNumber}
        onChange={onChange}
        showSizeChanger={false}
        pageSize={12}
        hideOnSinglePage={true}
        total={numFound}
      />
    )}
			</>
			) : (
        <div>Loading...</div>
      )}
		</div>
	)

}

export default SearchBody
