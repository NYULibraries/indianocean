import PropTypes from 'prop-types';

export default function ResultsFound(props) {
	const { numFound, documentsLength, pageNumber } = props;
	// const displayStart = pageNumber < 1 ? 1 : pageNumber + 1;
    const displayStart = 1;
	// const displayLength = pageNumber + documentsLength;
    const displayLength = 10;
    return (
        <>
		    <div className="resultsnum">
			    Showing items <span className="start">{displayStart}</span> -{" "}
				<span className="docslength">{displayLength}</span> of <span className="numfound">{numFound}</span>
			</div>
        </>
    );
}

ResultsFound.propTypes = {
    numFound: PropTypes.number,
    documentsLength: PropTypes.number,
    pageNumber: PropTypes.number,
};

ResultsFound.defaultProps = {
  numFound: 0,
  documentsLength: 0,
  pageNumber: 1,
};
