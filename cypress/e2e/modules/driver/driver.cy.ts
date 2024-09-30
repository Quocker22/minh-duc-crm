import { loginSteps } from 'cypress/e2e/utils';

describe('DRIVER LIST', () => {
  before(() => {
    loginSteps();
  });

  it('Should be able render driver list', () => {
    cy.visit('/drivers');

    const rootElement = cy.get('[data-testid="driver-list-element"]');
    rootElement.should('be.visible');
    rootElement.get('[data-testid="driver-list-toolbar"]').click();
  });
});

describe('DRIVER DETAIL', () => {
  before(() => {
    loginSteps();
  });

  it('Should be able render driver detail', () => {
    cy.visit('/drivers/fde69fd1-4c94-11ed-b237-0242c0a8a002/overview');

    const rootElement = cy.get('[data-testid="driver-detail-element"]');
    rootElement.should('be.visible');
    rootElement.get('[data-testid="driver-detail-toolbar-element"]').click();
  });
});

export {};
