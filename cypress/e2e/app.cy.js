describe('Navigation', () => {
  it('should navigate to the about page', () => {
    cy.visit('/')
 
    cy.get('a[href*="profile"]').click()
 
    cy.url().should('include', '/profile')
 
    cy.get('p').contains('Vous devez être connecté pour accéder à cette page.')
  })
})