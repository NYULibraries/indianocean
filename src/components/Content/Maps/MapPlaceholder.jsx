import React from 'react'

import { Spin } from 'antd'

const MapPlaceholder = (props) => {
	const { height } = props
	console.log(height)
	return (
		<div className='mapPlaceholder' style={{height:`${height}px`}}>
			<Spin size='large' style={{'position':'relative', 'marginTop': '0%','marginLeft': '0%'}}/>
		</div>
	)
}

export default MapPlaceholder
