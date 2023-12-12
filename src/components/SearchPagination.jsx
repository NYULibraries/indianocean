import {  ConfigProvider, Pagination } from 'antd'
import theme from './Styles/themeConfig'

const onChange = (page) => {
  const searchParams = new URLSearchParams(window.location.href)
  const sortField = searchParams.get('sortField') ? searchParams.get('sortField') : 'ss_title'
  const sortDir = searchParams.get('sortDir') ? searchParams.get('sortDir') : 'asc'
  let q = document.querySelector('#q').value
  if (q === '') {
    q = '*:*'
  }
	window.location.href = `/search?q=${q}&page=${page}&sortField=${sortField}&sortDir=${sortDir}`
}

function SearchPagination(props) {
  const { currentPage, numFound, rows }  = props
  return (
    <ConfigProvider theme={theme}>
      <Pagination
        current={currentPage}
        showSizeChanger={false}
        pageSize={rows}
        hideOnSinglePage={true}
        total={numFound}
        onChange={onChange}
        style={
          {
            textAlign: 'center'
          }
        }
      />
    </ConfigProvider>
  )
}

export default SearchPagination
