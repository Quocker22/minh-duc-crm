import { loginSteps } from 'cypress/e2e/utils';

describe('ORDER', () => {
  before(() => {
    loginSteps();
  });

  it('Should be able render order', () => {
    cy.visit('/orders');

    const rootElement = cy.get('[data-testid="order-list-element"]');
    rootElement.should('be.visible');
  });
});

export {};
