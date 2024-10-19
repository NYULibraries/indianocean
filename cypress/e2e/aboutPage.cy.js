describe('About page visit', ()=>{
	describe('Text content load', () => {
		it('Should load text content', ()=>{
			cy.visit('/about');
			cy.get('.page-title', {timeout: 3000}).contains('About')
			cy.get('.maintext', {timeout: 3000}).find('h3').each($h3 => {
			cy.wrap($h3).should('not.be.empty')})
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
