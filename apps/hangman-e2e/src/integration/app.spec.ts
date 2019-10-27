import { getGreeting } from '../support/app.po';

describe('hangman', () => {
    beforeEach(() => cy.visit('/'));

    it('should display welcome message', () => {
        getGreeting().contains('Welcome to hangman!');
    });
});
