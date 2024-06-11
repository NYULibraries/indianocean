import { ConfigProvider, Pagination } from "antd";
import theme from "../../Styles/themeConfig";
import PropTypes from "prop-types";
import { changePageNumStore} from "../../../stores/pageNum";

function SearchPagination(props) {
	const { currentPage, numFound, rows } = props;

	const onChange = (page) => {
		const searchParams = new URLSearchParams(window.location.search);
		const sortField = searchParams.get("sortField") ? searchParams.get("sortField") : "ss_title";
		const sortDir = searchParams.get("sortDir") ? searchParams.get("sortDir") : "asc";
		let q = document.querySelector("#q").value;
		if (q === "") q = "*:*";
		window.history.pushState({}, "", `/search?q=${q}&page=${page}&sortField=${sortField}&sortDir=${sortDir}`);
		changePageNumStore(page);
	};
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
