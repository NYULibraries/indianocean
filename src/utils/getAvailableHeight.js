function calculateAvailableHeight() {
	const body = document.querySelector("body");
	const children = Array.from(body.children);
	const iframe = document.querySelector("iframe");
	let height = document.documentElement.clientHeight;
	for (let i = 0; i < children.length; i++) {
		height -= children[i].offsetHeight;
		if (height <= 0) break;
	}

	if (iframe) iframe.style.height = `${height}px`;
	return height;
}

export default calculateAvailableHeight;
