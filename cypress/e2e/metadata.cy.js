describe('Page Titles', () => {
	it('should have correct title on home page', () => {
		cy.visit('/');
		cy.title().should('eq', 'Indian Ocean Digital Collection - NYU Libraries');
	});

	it('should have correct title on about page', () => {
		cy.visit('/about');
		cy.title().should('eq', 'About - Indian Ocean Digital Collection - NYU Libraries');
	});

	it('should have correct title on search page', () => {
		cy.visit('/search');
		cy.title().should('eq', 'Browse - Indian Ocean Digital Collection - NYU Libraries');
	});

	it('should have correct title on map detail page', () => {
		cy.visit('/map/fales_io_map000048');
		cy.title().should('not.eq', 'Loading...');
		cy.title().should('include', "Carte des dernières découvertes dans le sud de l'Afrique");
	});

	it('should have correct title on book detail page', () => {
		cy.visit('/book/fales_io_book000004');
		cy.title().should('not.eq', 'Loading...');
		cy.title().should(
			'include',
			'Instructions sur la navigation des Indes Orientales et de la Chine, pour servir au Neptune oriental'
		);
	});
});
