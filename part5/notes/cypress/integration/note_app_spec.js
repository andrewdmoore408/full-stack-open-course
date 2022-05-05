/* global cy */
describe('Note app', function() {
  beforeEach(function () { cy.visit('http://localhost:3000'); });

  it('front page can be opened', function() {
    cy.contains('Notes');
    cy.contains('Note app: Department of Computer Science, University of Helsinki 2022');
  });

  it('login form can be opened', function () {
    cy.contains('login').click();
  });

  it('user can login', function () {
    cy.contains('login').click();
    cy.get('input#username').type('bigburd');
    cy.get('input#password').type('123 Sesame St');
    cy.get('#loginButton').click();

    cy.contains('Big Bird logged-in');
  });
});
