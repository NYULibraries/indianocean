import React from 'react'

import { Spin } from 'antd'

const MapPlaceholder = (props) => {
	const { height } = props
	return (
		<div style={{height:`${height}px`}}>
			<Spin size='large' style={{'position':'relative', 'marginTop': '0%','marginLeft': '10%'}}/>
		</div>
	)
}

export default MapPlaceholder
