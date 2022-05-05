describe('Note app', function() {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Tommy Testing',
      username: 'ttesting',
      password: 'scoobity12345!',
    };

    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function() {
    cy.contains('Notes');
    cy.contains('Note app: Department of Computer Science, University of Helsinki 2022');
  });

  it('login form can be opened', function () {
    cy.contains('login').click();
  });

  it('user can login', function () {
    cy.contains('login').click();
    cy.get('input#username').type('ttesting');
    cy.get('input#password').type('scoobity12345!');
    cy.get('#loginButton').click();

    cy.contains('Tommy Testing logged-in');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'ttesting', password: 'scoobity12345!' });
    });

    it('a new note can be created', function () {
      cy.contains('new note').click();
      cy.get('#newNoteInput').type('a note created by cypress');
      cy.get('#addNoteButton').click();
      cy.contains('a note created by cypress');
    });

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({
          content: 'another note cypress',
          important: false
        });
      });

      it('it can be made important', function () {
        cy.contains('another note cypress')
          .contains('make important')
          .click();

        cy.contains('another note cypress')
          .contains('make unimportant');
      });
    });
  });

  it('login fails with wrong password', function () {
    cy.contains('login').click();
    cy.get('#username').type('mluukkai');
    cy.get('#password').type('wrong');
    cy.get('#loginButton').click();

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 49, 49)')
      .and('have.css', 'border-style', 'solid');

    cy.get('html').should('not.contain', 'Matti Luukkainen logged in');
  });
});
