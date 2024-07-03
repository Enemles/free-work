// cypress/e2e/login.cy.js
describe('OAuth Login Tests', () => {
  it('should display login form', () => {
    cy.visit('/api/auth/signin');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should login successfully with OAuth', () => {
    cy.visit('/');
    cy.loginByGithub();
    cy.reload();

    cy.getCookie('next-auth.session-token').should('exist');
    cy.getCookie('next-auth.session-token').should('have.property', 'value', 'mocked_token');

    cy.visit('/profile');
    cy.url().should('include', '/profile');
    cy.contains('connecté').should('be.visible');
  });
});
