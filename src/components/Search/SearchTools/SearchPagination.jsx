import { ConfigProvider, Pagination } from "antd";
import theme from "../../Styles/themeConfig";
import PropTypes from "prop-types";

function getHashParams() {
  const hashParams = {};
  const hash = window.location.hash.substr(1); // Remove the '#' symbol
  const queryParams = hash.split('&')
  queryParams.forEach(function(param) {
    const parts = param.split('=');
    const key = parts[0];
    const value = parts[1];
    hashParams[key] = decodeURIComponent(value);
  });

  return hashParams;
}

const onChange = (page) => {
	const searchParams = getHashParams();
	const sortField = searchParams.sortField ? searchParams.sortField : "ss_title";
	const sortDir = searchParams.sortDir ? searchParams.sortDir : "asc";
	let q = document.querySelector("#q").value;
	if (q === "") {
      q = "*:*";
	}
	window.location.href = `/search#q=${q}&page=${page}&sortField=${sortField}&sortDir=${sortDir}`;
};

function SearchPagination(props) {
	const { currentPage, numFound, rows } = props;
	return (
		<ConfigProvider theme={theme}>
			<Pagination
				current={currentPage}
				showSizeChanger={false}
				pageSize={rows}
				hideOnSinglePage={true}
				total={numFound}
				onChange={onChange}
				style={{
					textAlign: "center"
				}}
			/>
		</ConfigProvider>
	);
}

SearchPagination.propTypes = {
	currentPage: PropTypes.number.isRequired,
	numFound: PropTypes.number.isRequired,
	rows: PropTypes.string.isRequired
};
export default SearchPagination;
