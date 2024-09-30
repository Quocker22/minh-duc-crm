import { loginSteps } from 'cypress/e2e/utils';

describe('EMPLOYEE', () => {
  before(() => {
    loginSteps();
  });

  it('Should be able render employee', () => {
    cy.visit('/employees');

    const rootElement = cy.get('[data-testid="employee-list-element"]');
    rootElement.should('be.visible');
    rootElement.get('[data-testid="employee-list-toolbar"]').click();
  });
});

export {};
