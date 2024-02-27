import PropTypes from "prop-types";

function SearchHeader(props) {
	const { query } = props;

	if (query === "*:*") return <h2 className="page-title">Browse titles</h2>;

	return (
		<h2 className="page-title">
			Search Results for: <span className="s-query">{query}</span>
		</h2>
	);
}

SearchHeader.propTypes = {
	query: PropTypes.string.isRequired
};
export default SearchHeader;
