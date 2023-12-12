function SearchLabel(props) {
  const { query } = props
  console.log('query', query)
  if (query === '*:*') {
    return <h2 className="page-title">Browse titles</h2>
  } else {
    return <h2 className="page-title">Search Results for: <span className="s-query">{query}</span></h2>
  }
}

export default SearchLabel
