// cypress/e2e/createProject.cy.js
describe('Create Project Tests', () => {
  beforeEach(() => {
    cy.loginByGithub();
  });

  it('should display create project form', () => {
    cy.visit('/projects/create');
    cy.get('input[name="title"]').should('be.visible');
    cy.get('textarea[name="description"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should show error on missing title', () => {
    cy.visit('/projects/create');
    cy.get('textarea[name="description"]').type('This is a test project description.');
    cy.get('button[type="submit"]').click();
    cy.contains('Title is required').should('be.visible');
  });

  it('should create project successfully', () => {
    cy.visit('/projects/create');
    cy.get('input[name="title"]').type('Test Project');
    cy.get('textarea[name="description"]').type('This is a test project description.');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/projects');
    cy.contains('Test Project').should('be.visible');
  });
});
