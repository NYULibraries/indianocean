import {useState, useEffect} from 'react'

import throttle from 'lodash.throttle';

import MapPlaceholder from './MapPlaceholder';

const Map = () => {

	const [viewport,setViewport] = useState({width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0), height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)})

	const [isLoaded, setIsLoaded] = useState(false)

	const mapLoad = () => {
		setIsLoaded(true);
	}

	const calculateAvailableHeight = ()=>{
		const body = document.querySelector('body')
		const children = Array.from(body.children)
		let height = document.documentElement.clientHeight
		// console.log(`doc ${height}`)
		for (let i = 0; i < children.length; i++){
				height -= children[i].offsetHeight
				if(height <= 0){
					break;
				}
		}
		// console.log(`newdoc ${height}`)
		if (height > 0){
			return height
		}
		return 0
	}

	window.addEventListener('resize', calculateAvailableHeight)

const handleResize = throttle(()=>{
	setViewport({width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0), height: window.innerHeight})
	// console.log(viewport)
},1500);


useEffect(()=>{
	// 	window.addEventListener('resize', handleResize)
	// return()=>{
	// 	window.removeEventListener('resize',handleResize)
	// }
},[viewport])

	return (
		<>
			{!isLoaded && <MapPlaceholder height={calculateAvailableHeight()}/>}
			<div className={!isLoaded?'mapContainerLoading':undefined}>
			<iframe onLoad={mapLoad} style={{height:`${calculateAvailableHeight()}px`}} role="main" title="Viewer" className="widget book" id="book" name="book" allowFullScreen="" src={`https://sites.dlib.nyu.edu/viewer/maps/fales_io_map000002/1`}/>
			</div>
		</>
	)
}

export default Map
