import { useStore } from "@nanostores/react"
import { pageNum, increasePageNum, startPageNum } from '../../../stores/page'
import PaginationItem from './PaginationItem'

const PaginationCarousel = ({totalpages}) => {
	const $pageNum = useStore(pageNum)
	return (
		<div className='carouselContainer'>
			<div id='pageFirst' onClick={()=>startPageNum()}>	&lt;&lt; first</div>
			<PaginationItem value={1}/>
			{$pageNum>6 && <PaginationItem value='...'/>}
			<div>{$pageNum}</div>
			{totalpages.map((page)=>{
				return <PaginationItem value={page} key={page}/>
			})}
			{$pageNum < 13 && <PaginationItem value = '...'/>}
			<PaginationItem value={17}/>
			<div id='pageNext' onClick={()=>increasePageNum()}>next &gt;</div>
		</div>
	)
}

export default PaginationCarousel
