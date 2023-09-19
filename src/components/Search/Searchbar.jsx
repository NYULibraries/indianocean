import { useState, useEffect } from 'react'
import { useStore } from "@nanostores/react"
import { searchQuery } from "../../stores/search"

const Searchbar = () => {
	const [search, setSearch] = useState('a')

	const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

	useEffect(()=>{
		console.log(search)
	},[search])
	console.log(search)
	return (
		<div class="search_holder widget navbar-form navbar-right">
      <form method="get" role="search">
        <input name="q" type="text" placeholder="Search titles, subjects, authors..." title="Enter the terms you wish to search for." aria-label="Search" value={search} onChange={handleChange} />
        <input type="submit" class="submit-search" aria-label="Submit Search" />
      </form>
    </div>
	)
}

export default Searchbar

