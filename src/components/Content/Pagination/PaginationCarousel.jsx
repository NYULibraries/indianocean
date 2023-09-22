import { useStore } from "@nanostores/react"
import { pageNum, increasePageNum, startPageNum } from '../../../stores/page'
import PaginationItem from './PaginationItem'

const PaginationCarousel = ({totalelements}) => {
	const $pageNum = useStore(pageNum)
	const elemPerPage = 12
	const totalpages = Math.ceil(totalelements / elemPerPage)
	console.log(totalpages)
	const totalpagesarr = (totalpages) =>{
		let pages = totalpages - 1
		return Array.from(new Array(pages), (x,i) => i+2)
	}
	const increase = (totalpages)=>{
		if($pageNum <= totalpages){
			increasePageNum()
			return
		}
		return
	}
	return (
		<div className='carouselContainer'>
			<div id='pageFirst' onClick={()=>startPageNum()}>	&lt;&lt; first</div>
			<PaginationItem value={1}/>
			{$pageNum > 6 && <PaginationItem value='...'/>}
			<div>{$pageNum}</div>
			{totalpagesarr(totalpages).map((page)=>{
				return <PaginationItem value={page} key={page}/>
			})}
			{$pageNum < 13 && <PaginationItem value = '...'/>}
			<PaginationItem value={17}/>
			<div id='pageNext' onClick={()=>increase(totalpages)}>next &gt;</div>
		</div>
	)
}

export default PaginationCarousel
