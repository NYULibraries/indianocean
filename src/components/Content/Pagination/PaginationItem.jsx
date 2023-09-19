import { useStore } from "@nanostores/react"
import { pageNum, selectPageNum } from "../../../stores/page"

const PaginationItem = ({value}) => {
	const $pageNum = useStore(pageNum)
	if(value === '...'){
		return <div className='paginationItemElips'>{value}</div>
	}else{
		if($pageNum === value){
			return <div className='paginationItemNumberActive' onClick={()=>selectPageNum(value)}>{value}</div>
		}else{
			return <div className='paginationItemNumber' onClick={()=>selectPageNum(value)}>{value}</div>
		}
	}
}

export default PaginationItem
