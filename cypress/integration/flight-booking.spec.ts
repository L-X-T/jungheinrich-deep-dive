describe('Flight Search E2E Test', () => {
  beforeEach(() => {
    cy.visit('/flight-booking/flight-search');
  });

  it('should verify that flight search is showing cards', () => {
    cy.get('input[name=from]').clear().type('Graz');
    cy.get('input[name=to]').clear().type('Hamburg');
    cy.get('form .btn').should(($button) => {
      expect($button).to.not.have.attr('disabled', 'disabled');
    });

    cy.get('form .btn').click();
    cy.get('flight-card').its('length').should('be.gte', 3);
  });

  it('should search for flights from Wien to Eisenstadt by intercepting the network', () => {
    cy.fixture('flights').then((flights) => cy.intercept('GET', 'http://www.angular.at/api/flight**', flights));
    cy.get('input[name=from]').clear().type('Wien');
    cy.get('input[name=to]').clear().type('Eisenstadt');
    cy.get('form .btn').click();

    cy.get('flight-card').first().as('flight-card');
    cy.get('@flight-card').find('> div').should('have.css', 'background-color', 'rgb(255, 255, 255)');
    cy.get('@flight-card').contains('button', 'Select').click();
    cy.get('@flight-card').contains('button', 'Select').should('not.exist');
    cy.get('@flight-card').contains('button', 'Remove').should('exist');
  });

  it('should disable the search button when form is invalid', () => {
    cy.get('input[name=from]').clear();
    cy.get('input[name=to]').clear();
    cy.get('form .btn').should('be.disabled');
  });

  it('should enable the search button when form is valid', () => {
    cy.get('input[name=from]').clear().type('Wien');
    cy.get('input[name=to]').clear().type('Frankfurt');
    cy.get('form .btn').should('not.be.disabled');
  });
});
