import PropTypes from "prop-types";
import FilterDropdown from "../../Content/Filter/FilterDropdown";

function SearchSubheader(props) {
	const response = props.response?.response;

	if (response) {
		const { numFound, start } = response;
		const documentsLength = response.docs.length;
		const displayStart = start < 1 ? 1 : start + 1;
		const displayLength = start + documentsLength;

		return numFound < 1 ? (
			<div className="col">
				<p>Sorry, no results found.</p>
				<p>Try a different term.</p>
			</div>
		) : (
			<>
				<div className="resultsnum">
					Showing items <span className="start">{displayStart}</span> -{" "}
					<span className="docslength">{displayLength}</span> of <span className="numfound">{numFound}</span>
				</div>
				<FilterDropdown />
			</>
		);
	}
}

SearchSubheader.propTypes = {
	response: PropTypes.object.isRequired
};
export default SearchSubheader;
