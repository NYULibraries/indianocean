function FilterDropdown() {

  const searchParams = new URLSearchParams(window.location.href)

  const sortField = searchParams.get('sortDir') ? searchParams.get('sortDir') : 'asc'

	const changeSortType = (e) => {
    e.preventDefault()
    const sortField = e.target.value
    const searchParams = new URLSearchParams(window.location.href)
    const sortDir = searchParams.get('sortDir') ? searchParams.get('sortDir') : 'asc'
    const page = searchParams.get('sortField') ? searchParams.get('page') : 0
    let q = document.querySelector('#q').value
    if (q === '') {
      q = '*:*'
    }
    window.location.href = `/search?q=${q}&page=${page}&sortField=${sortField}&sortDir=${sortDir}`
	}

	return (
		<div className="filters">
      <select id="browse-select" aria-label="Search Sort Results" defaultValue={sortField} onChange={ changeSortType }>
        <option data-sort-dir="asc" value="ss_longlabel">Sort by Title</option>
        <option data-sort-dir="asc" value="ss_sauthor">Sort by Author</option>
        <option data-sort-dir="asc" value="ss_ssubject">Sort by Subject</option>
        <option data-sort-dir="asc" value="ss_publocation">Sort by Place</option>
      </select>
    </div>
	)
}

export default FilterDropdown


