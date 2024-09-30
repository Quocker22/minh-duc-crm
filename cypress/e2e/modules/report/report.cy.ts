import { loginSteps } from 'cypress/e2e/utils';

describe('REPORT', () => {
  before(() => {
    loginSteps();
  });

  it('Should be able render report', () => {
    cy.visit('/dashboard');
    cy.get('[data-testid="order-statistic-element"]').should('be.visible');
    cy.get('[data-testid="driver-statistic-element"]').should('be.visible');

    cy.visit('/');
    cy.get('[data-testid="order-statistic-element"]').should('be.visible');
    cy.get('[data-testid="driver-statistic-element"]').should('be.visible');
  });
});

export {};
