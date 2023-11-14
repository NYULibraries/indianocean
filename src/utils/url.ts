// Get the URL of the current page
 export const url = new URL(window.location.href)

 export const defaultQuery = '*:*'

 export const search = url.searchParams.get('q') ? url.searchParams.get('q') : defaultQuery

 // Get the value of 'q' from the query string
 export const pageNumber = url.searchParams.get('page') ? parseInt(url.searchParams.get('page'), 10) : 1

 // Get the last part of the URL
//  export const id = url.searchParams.get('id') ? url.searchParams.get('id') : ''

 export const getID = (url)=>{
	const parts = url.split('/')
	return  parts[parts.length - 2] + '/' + parts[parts.length - 1]
 }
 export const parts = url.pathname.split('/')
 export const id = parts[parts.length - 2] + '/' + parts[parts.length - 1]
//  Get root of URL
 export const root = url.protocol + '//' + url.hostname + (url.port ? ':' + url.port : '');


