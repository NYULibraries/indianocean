import { useState, memo, useCallback } from "react";
import { getDocumentTypeByBundle } from "../../utils/getDocumentTypeByBundle";
import { useStore } from "@nanostores/react";
import { env } from "../../utils/Constants/env";
import { changeSearchStore, search } from "../../stores/search";
import SearchPlaceholder from "../Search/SearchPlaceholder";
import PropTypes from "prop-types";
import { changeSortStore, sort } from "../../stores/sortField";

// Move static computation outside component
const getBundleType = (bundle) => bundle.substring(0, bundle.length - 1);

const SearchResult = memo(function SearchResult(props) {
	const document = props.data;
	const [isLoaded, setIsLoaded] = useState(false);

	const $sortField = useStore(sort);
	const $searchField = useStore(search);

	const viewerUrl = env.PUBLIC_VIEWERURL;

	// Memoize callback
	const imageLoad = useCallback(() => {
		setIsLoaded(true);
	}, []);

	const bundle = getDocumentTypeByBundle(document.bundle);
	const type = getBundleType(bundle);
	const identifier = document.sm_field_identifier[0];

	const label = document.ss_title_long;

	// Memoize subject click handler
	const handleSubjectClick = useCallback((subject) => (e) => {
		e.preventDefault();
		changeSearchStore(subject);
		changeSortStore("default");
		
		window.location.href = `/search?q=${subject}&page=1&sortField=default&sortDir=asc`;
	}, []);

	return (
		<article className="item" key={identifier}>
			<div className="card">
				<div className="thumbs">
					{!isLoaded && <SearchPlaceholder />}
					<div className={isLoaded ? "clipper" : "clipperNoshadow imagePlaceholder"}>
						<a href={`/${type}/${identifier}`} aria-hidden="true" role="presentation" tabIndex="-1">
							<img
								// width="150"
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
					{document.sm_author?.map((author, key) => {
						return (
							<span key={`author-${key}`} className="md_author">
								{author}
							</span>
						);
					})}
				</div>
				<div className="md_publisher">
					<span className="md_label">Publisher:</span>
					{document.sm_field_publication_location?.map((location, key) => {
						return <span key={`location-${key}`}>{location}</span>;
					})}
					,
					{document.sm_publisher?.map((publisher, key) => {
						return <span key={`publisher-${key}`}>{publisher}</span>;
					})}
					, {document.ss_pubdate}
				</div>
				<div className="md_provider">
					<span className="md_label">Provider:</span>
					{document.sm_collection_partner_label?.map((collectionPartner, key) => {
						return <span key={`partner-${key}`}>{collectionPartner}</span>;
					})}
				</div>
				<div className="md_subjects">
					<span className="md_label">Subjects:</span>
					{document.sm_subject_label?.map((subject, key) => {
						const isSelected = subject.toLowerCase() === $searchField.toLowerCase();
						
						return isSelected ? (
							<a key={`subject-${key}`} className="md_subject" aria-disabled="true">
								<span className="md_subject_selected">{subject}</span>
							</a>
						) : (
							<a
								key={`subject-${key}`}
								className="md_subject"
								href={`/search?q=${subject}&page=1&sortField=${$sortField}&sortDir=asc`}
								onClick={handleSubjectClick(subject)}
							>
								{subject}
							</a>
						);
					})}
				</div>
			</div>
		</article>
	);
});

SearchResult.propTypes = {
	data: PropTypes.object.isRequired
};
export default SearchResult;
