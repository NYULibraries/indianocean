describe('Home page visit', ()=>{
	describe('Text content load', () => {
		it('Should load text content', ()=>{
			cy.visit('/');
			cy.get('.page-title', {timeout: 3000}).contains('Monographs, Maps, Postcards, Prints')

		})
	 })
	describe('Check resource load', ()=>{
		it('Should check that there are 12 cards', ()=>{
			cy.get('.card').should('have.length',12).each(($child)=>{
				cy.wrap($child).find('.thumbs').should('exist')
				cy.wrap($child).find('.md_title').should('exist')
				cy.wrap($child).find('.md_authors').should('exist')
				cy.wrap($child).find('.md_publisher').should('exist')
				cy.wrap($child).find('.md_provider').should('exist')
				cy.wrap($child).find('.md_subjects').should('exist')
			})
		})
	})
	describe('Check footer',()=>{
		it('Should check footer is loaded',()=>{
			cy.get('.footer-wrapper-top').children().each(($child)=>{
				cy.wrap($child).should('exist')
			})
		})
	 })
})
