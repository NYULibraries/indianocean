import React from 'react'

import { Spin } from 'antd'

const SearchPlaceholder = () => {

	return (
		<div className='searchplaceholder'>
			<Spin size='large' style={{'position':'relative', 'marginTop': '0%','marginLeft': '10%'}}/>
		</div>
	)
}

export default SearchPlaceholder
