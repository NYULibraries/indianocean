import { ConfigProvider, Spin } from "antd";
import theme from "../Styles/themeConfig";

const SearchPlaceholder = () => {
	return (
		<ConfigProvider theme={theme}>
			<div className="searchplaceholder">
				<Spin
					size="large"
					style={{
						position: "relative",
						marginTop: "0%",
						marginLeft: "10%"
					}}
				/>
			</div>
		</ConfigProvider>
	);
};

export default SearchPlaceholder;
