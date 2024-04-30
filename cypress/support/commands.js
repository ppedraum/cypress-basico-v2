
Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function(){
    cy.get('#firstName').type('Pedro');
    cy.get('#lastName').type('Virt');
    cy.get('#email').type('teste@example.com');
    cy.get('#open-text-area').type('teste');
    cy.get('button[type="submit"]').click();

    cy.contains('button','Enviar').should('be.visible');
});