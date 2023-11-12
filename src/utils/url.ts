// Get the URL of the current page
 export const url = new URL(window.location.href)

 export const defaultQuery = '*:*'

 export const search = url.searchParams.get('q') ? url.searchParams.get('q') : defaultQuery

 // Get the value of 'q' from the query string
 export const pageNumber = url.searchParams.get('page') ? parseInt(url.searchParams.get('page'), 10) : 1

 // Get the last part of the URL
 export const id = url.searchParams.get('id') ? url.searchParams.get('id') : ''

//  Get root of URL
 export const root = url.protocol + '//' + url.hostname + (url.port ? ':' + url.port : '');


