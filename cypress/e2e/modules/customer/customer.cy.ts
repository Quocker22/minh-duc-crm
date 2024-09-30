import { loginSteps } from 'cypress/e2e/utils';

describe('CUSTOMER', () => {
  before(() => {
    loginSteps();
  });

  it('Should be able render customer', () => {
    cy.visit('/customers');

    const rootElement = cy.get('[data-testid="customer-list-element"]');
    rootElement.should('be.visible');
    rootElement.get('[data-testid="customer-list-toolbar"]').click();
  });
});

export {};
