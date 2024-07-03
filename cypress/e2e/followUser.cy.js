// cypress/e2e/followUser.cy.js
describe('Follow User Tests', () => {
  beforeEach(() => {
    cy.login('valid@example.com', 'validpassword');
  });

  it('should follow a user successfully', () => {
    cy.visit('/users');
    cy.get('button[data-cy="follow-button"]').first().click();
    cy.contains('Following').should('be.visible');
  });

  it('should unfollow a user successfully', () => {
    cy.visit('/users');
    cy.get('button[data-cy="follow-button"]').first().click();
    cy.contains('Following').should('be.visible');
    cy.get('button[data-cy="unfollow-button"]').first().click();
    cy.contains('Follow').should('be.visible');
  });
});
