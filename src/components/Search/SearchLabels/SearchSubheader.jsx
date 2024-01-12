function SearchSubheader(props) {
  const response = props.response?.response
  if (response) {
    const { numFound, start } = response
    const documentsLength = response.docs.length
    const displayStart = (start < 1) ? 1 : (start + 1)
    const displayLength = start + documentsLength

    return (
      <div className="resultsnum">
        Showing items <span className="start">{displayStart}</span> - <span className="docslength">{displayLength}</span> of <span className="numfound">{numFound}</span>
      </div>
    )
  }
}

export default SearchSubheader
