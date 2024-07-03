/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// cypress/support/commands.ts
Cypress.Commands.add('loginByGithub', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/api/auth/callback/github',
    body: {
      code: 'mocked_code',
    },
  }).then((res) => {
    const token = res.body.token || 'mocked_token';

    // Définir le cookie avec les attributs corrects
    cy.setCookie('next-auth.session-token', token, {
      domain: 'localhost',
      path: '/',
      httpOnly: false, // Assurez-vous que ce n'est pas HTTP only pour Cypress
      secure: false, // Assurez-vous que ce n'est pas sécurisé pour l'environnement de test
    });
  });
});

