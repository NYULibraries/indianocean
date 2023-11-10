import {useState, useEffect} from 'react'

import MapPlaceholder from '../Maps/MapPlaceholder';

import { id } from '../../../utils/url';

const Book = () => {

	const [isLoaded, setIsLoaded] = useState(false)

	const mapLoad = () => {
		setIsLoaded(true);
	}

	const calculateAvailableHeight = ()=>{
		const body = document.querySelector('body')
		const children = Array.from(body.children)
		let height = document.documentElement.clientHeight
		for (let i = 0; i < children.length; i++){
				height -= children[i].offsetHeight
				if(height <= 0){
					break;
				}
		}
		const iframe = document.querySelector('iframe')
		if(iframe){
			iframe.style.height = `${height}px`
		}
		return height
	}

	window.addEventListener('resize', calculateAvailableHeight)

	useEffect(()=>{
			window.history.pushState({},"",`/books/${id}`)
	},[])

	return (
		<>
			{!isLoaded && <MapPlaceholder height={calculateAvailableHeight()}/>}
			<div className={!isLoaded?'mapContainerLoading':undefined}>
			<iframe onLoad={mapLoad} style={{height:calculateAvailableHeight()}} role="main" title="Viewer" className="widget book" id="book" name="book" allowFullScreen="" src={`https://sites.dlib.nyu.edu/viewer/books/${id}`}/>
			</div>
		</>
	)
}

export default Book
