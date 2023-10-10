import { changeSortStore, sort} from '../../stores/sortField'
import { useStore } from '@nanostores/react'
import { search } from '../../utils/url'

const FilterDropdown = () => {
	const $sortField = useStore(sort)
	const changeSortType = (e)=>{
		changeSortStore(e)
		// window.location.href = `/search?q=${'a'}&page=${1}&sortField=${$sortField}&sortDir=${'asc'}`
	}
	return (
		<div className="filters">
      <select id="browse-select" aria-label="Search Sort Results" defaultValue={$sortField} onChange={e=>changeSortType(e.target.value)}>
        <option data-sort-dir="asc" value="ss_longlabel">Sort by Title</option>
        <option data-sort-dir="asc" value="ss_sauthor">Sort by Author</option>
        <option data-sort-dir="asc" value="ss_ssubject">Sort by Subject</option>
        <option data-sort-dir="asc" value="ss_publocation">Sort by Place</option>
      </select>
    </div>
	)
}

export default FilterDropdown


