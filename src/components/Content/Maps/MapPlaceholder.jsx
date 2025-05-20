import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';

const MapPlaceholder = (props) => {
	const { height } = props;
	return (
		<div
			className='mapPlaceholder'
			style={{
				height: `${height}px`
			}}
		>
			<Spin
				size='large'
				style={{
					position: 'relative',
					marginTop: '0%',
					marginLeft: '0%'
				}}
			/>
		</div>
	);
};

MapPlaceholder.propTypes = {
	height: PropTypes.number.isRequired
};

export default MapPlaceholder;
