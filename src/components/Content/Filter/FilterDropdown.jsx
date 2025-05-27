import React, { useEffect, useRef } from 'react';
import { changeSortStore, sort, sortedBySubject } from '../../../stores/sortField';
import { useStore } from '@nanostores/react';
import { changePageNumStore } from '../../../stores/pageNum';

const FilterDropdown = () => {
	const $sortField = useStore(sort);
	const $sortedBySubject = useStore(sortedBySubject);
	const selectRef = useRef(null);

	const changeSortType = (e) => {
		changeSortStore(e);
		changePageNumStore(1);
	};

	useEffect(() => {
		if (selectRef.current) {
			selectRef.current.value = $sortField;
		}
	}, [$sortField]);

	return (
		<div className='filters'>
			<select
				id='browse-select'
				aria-label='Search Sort Results'
				defaultValue={$sortField}
				onChange={(e) => {
					return changeSortType(e.target.value);
				}}
				ref={selectRef}
			>
				<option data-sort-dir='asc' value='default'>
					Sort by Relevance
				</option>
				<option data-sort-dir='asc' value='ss_longlabel'>
					Sort by Title
				</option>
				<option data-sort-dir='asc' value='ss_sauthor'>
					Sort by Author
				</option>
				<option data-sort-dir='asc' value='ss_publocation'>
					Sort by Place
				</option>
			</select>
		</div>
	);
};

export default FilterDropdown;
