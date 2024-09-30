export function loginSteps() {
  cy.visit('/auth');

  const rootElement = cy.get('[data-testid="login-form-element"]');
  rootElement.should('be.visible');
  rootElement.get('[name="user_name"]').clear().type(Cypress.env('auth_username'));
  rootElement.get('[name="password"]').clear().type(Cypress.env('auth_password'));
  rootElement.get('button[type="submit"]').click();

  cy.url().should('include', '/dashboard');
}
