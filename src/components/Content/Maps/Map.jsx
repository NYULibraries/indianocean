import { useState, useEffect } from 'react'
import MapPlaceholder from './MapPlaceholder'
import calculateAvailableHeight from '../../../utils/getAvailableHeight'

const Book = (props) => {
	const { identifier, title, viewer } = props

	const [isLoaded, setIsLoaded] = useState(false)

	const mapLoad = () => {
		setIsLoaded(true)
	}

	window.addEventListener('resize', calculateAvailableHeight)

	const iFrameHeight = calculateAvailableHeight()

	return (
		<>
			{!isLoaded && <MapPlaceholder height={iFrameHeight} />}
			<div className={!isLoaded ? 'mapContainerLoading' : undefined}>
				<iframe
					role="application"
					onLoad={mapLoad}
					style={{ height: iFrameHeight }}
					title={title}
					className="widget book"
					id="book"
					name="book"
					allowFullScreen=""
					mozallowfullscreen=""
					webkitallowfullscreen=""
					src={`${viewer}/maps/${identifier}`}
				/>
			</div>
		</>
	)
}

export default Book
