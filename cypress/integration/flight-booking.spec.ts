describe('Flight Search E2E Test', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('should verify that flight search is showing cards', () => {
    cy.visit('/flight-booking/flight-search');
    cy.get('input[name=from]').clear().type('Graz');
    cy.get('input[name=to]').clear().type('Hamburg');
    cy.get('form .btn').should(($button) => {
      expect($button).to.not.have.attr('disabled', 'disabled');
    });

    cy.get('form .btn').click();
    cy.get('flight-card').its('length').should('be.gte', 3);
  });
});
