import { useStore } from "@nanostores/react"

const FilterDropdown = () => {
	return (
		<div className="filters">
      <select id="browse-select" aria-label="Search Sort Results">
        <option data-sort-dir="asc" value="ss_longlabel" selected>Sort by Title</option>
        <option data-sort-dir="asc" value="ss_sauthor">Sort by Author</option>
        <option data-sort-dir="asc" value="ss_ssubject">Sort by Subject</option>
        <option data-sort-dir="asc" value="ss_publocation">Sort by Place</option>
      </select>
    </div>
	)
}

export default FilterDropdown

