window.addEventListener('DOMContentLoaded', () => {
	const button = document.querySelector('button');
	const navbar = document.querySelector('.navbar-collapse');
	let collapsed = true;
	if (button && navbar) {
		button.addEventListener('click', (event) => {
			event.preventDefault();
			collapsed ? (navbar.style.height = '238px') : (navbar.style.height = '0px');
			collapsed = !collapsed;
		});
	}
});
