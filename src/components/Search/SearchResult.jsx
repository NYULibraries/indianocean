import { useState } from 'react'
import { getDocumentTypeByBundle } from '../../utils/getDocumentTypeByBundle'
import SearchPlaceholder from '../Search/SearchPlaceholder'

function SearchResult(props) {

	const document = props.data

	const [ isLoaded, setIsLoaded ] = useState(false)

	const viewerUrl = 'https://sites.dlib.nyu.edu/viewer'

	const imageLoad = () => {
		setIsLoaded(true)
	}

  const bundle = getDocumentTypeByBundle(document.bundle)

  const type = bundle.substring(0, bundle.length - 1) // remove the trailing 's' from the bundle name

  const identifier = document.sm_field_identifier[0]

  const label = document.ss_title_long

	return (
		<article className="item" key={identifier}>
			<div className="card">
				<div className="thumbs">
					{ !isLoaded && <SearchPlaceholder /> }
					<div className={ isLoaded ? 'clipper' : 'clipperNoshadow imagePlaceholder' }>
						<a href={`/${type}/${identifier}`} aria-hidden="true" role="presentation" tabIndex="-1">
							<img
                width="150"
                lazy="true"
                src={`${viewerUrl}/api/image/${bundle}/${identifier}/1/full/150,175/0/default.jpg`}
                alt=""
                title={label}
                onLoad={imageLoad}
                role="presentation"
              />
						</a>
					</div>
				</div>
				<h1 className="md_title">
					<a href={`/${type}/${identifier}`}>{label}</a>
				</h1>
				<div className="md_authors">
					<span className="md_label">Author:</span>
					{
						document.sm_author?.map((author, key) => {
							return <span key={`author-${key}`} className="md_author">{author}</span>
						})
					}
				</div>
				<div className="md_publisher">
					<span className="md_label">Publisher:</span>
					{
						document.sm_field_publication_location?.map((location, key) => ( <span key={`location-${key}`}>{location}</span> ))
					}
					,
					{
						document.sm_publisher?.map((publisher, key) => ( <span key={`publisher-${key}`}>{publisher}</span> ))
					}
					, {document.ss_pubdate}
				</div>
				<div className="md_provider">
					<span className="md_label">Provider:</span>
					{
						document.sm_collection_partner_label?.map((collectionPartner, key) => ( <span key={`partner-${key}`}>{collectionPartner}</span> ))
					}
				</div>
				<div className="md_subjects">
					<span className="md_label">Subjects:</span>
					{ document.sm_subject_label?.map((subject, key) => ( <a key={`subject-${key}`} className="md_subject" href={`/search?q=${subject}`}>{subject}</a> )) }
				</div>
			</div>
		</article>
	)
}

export default SearchResult
