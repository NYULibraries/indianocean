import { useState, useEffect } from "react";
import MapPlaceholder from "./MapPlaceholder";
import calculateAvailableHeight from "../../../utils/getAvailableHeight";
import PropTypes from "prop-types";

const Map = (props) => {
	const { identifier, title, viewer } = props;

	const [isLoaded, setIsLoaded] = useState(false);
	const [iFrameHeight, setIFrameHeight] = useState(calculateAvailableHeight());

	const mapLoad = () => {
		setIsLoaded(true);
	};

	useEffect(() => {
		const handleResize = () => {
			setIFrameHeight(calculateAvailableHeight());
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<>
			{!isLoaded && <MapPlaceholder height={iFrameHeight} />}
			<div className={!isLoaded ? "mapContainerLoading" : undefined}>
				<iframe
					role="application"
					onLoad={mapLoad}
					style={{ height: iFrameHeight }}
					title={title}
					className="widget book"
					id="book"
					name="book"
					allowFullScreen=""
					mozallowfullscreen=""
					webkitallowfullscreen=""
					src={`${viewer}/maps/${identifier}`}
				/>
			</div>
		</>
	);
};

Map.propTypes = {
	identifier: PropTypes.string.isRequired,
	title: PropTypes.string,
	viewer: PropTypes.string.isRequired
};
export default Map;
