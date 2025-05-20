export const env = {
	PUBLIC_APPURL: import.meta.env.PUBLIC_APPURL || 'dif5kvlgv1c7d.cloudfront.net',
	PUBLIC_DISCOVERYURL: import.meta.env.PUBLIC_DISCOVERYURL || 'https://discovery1.dlib.nyu.edu/solr/viewer',
	PUBLIC_VIEWERURL: import.meta.env.PUBLIC_VIEWERURL || 'https://sites.dlib.nyu.edu/viewer',
	PUBLIC_ROWS: import.meta.env.PUBLIC_ROWS || 12,
	PUBLIC_STARTITEMS: import.meta.env.PUBLIC_STARTITEMS || 0,
	PUBLIC_ALLITEMS: import.meta.env.PUBLIC_ALLITEMS || 1000,
	PUBLIC_COLLECTIONCODE: import.meta.env.PUBLIC_COLLECTIONCODE || 'io',
	PUBLIC_LANGUAGE: import.meta.env.PUBLIC_LANGUAGE || 'en',
	PUBLIC_BOOK: import.meta.env.PUBLIC_BOOK || 'dlts_book',
	PUBLIC_MAP: import.meta.env.PUBLIC_MAP || 'dlts_map'
};
