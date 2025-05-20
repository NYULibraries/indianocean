export function getDocumentTypeByBundle(bundle) {
	return {
		dlts_book: 'books',
		dlts_map: 'maps'
	}[bundle];
}
