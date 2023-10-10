import { getDocumentTypeByBundle } from '../../utils/getDocumentTypeByBundle'

import { useState, useEffect } from 'react'

import { Spin } from 'antd'

function SearchResult(props) {

	const document = props.data

	const [isLoaded, setIsLoaded] = useState(false)

	const viewerUrl = 'https://sites.dlib.nyu.edu/viewer'

	const imageLoad = () => {
		setIsLoaded(true);
	}

	return (
		<article className="item" key={document.entity_id}>
			<div className="card">
				<div className="thumbs">
					{!isLoaded && <Spin size='large'/>}
					<div className="clipper">
						<a href={`${getDocumentTypeByBundle(document.bundle)}/${document.sm_field_identifier}`} aria-hidden="true" role="presentation" tabIndex="-1">
							<img width="150" lazy="true" src={`${viewerUrl}/api/image/${getDocumentTypeByBundle(document.bundle)}/${document.sm_field_identifier}/1/full/150,/0/default.jpg`} alt="" title={document.ss_title_long} onLoad={imageLoad} role="presentation"/>
						</a>
					</div>
				</div>
				<h1 className="md_title">
					<a href={`${getDocumentTypeByBundle(document.bundle)}/${document.sm_field_identifier}/1`}>{document.ss_title_long}</a>
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
