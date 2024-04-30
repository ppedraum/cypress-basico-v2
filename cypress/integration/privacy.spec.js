/// <reference types="Cypress" />

describe('Privacy',function(){
    beforeEach(function(){
        cy.visit('./src/privacy.html');
    });


    it('Testa privacidade',function(){
        cy.contains('Talking About Testing').should('be.visible');
    });
})