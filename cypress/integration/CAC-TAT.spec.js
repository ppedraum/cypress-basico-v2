/// <reference types="Cypress" />

//suite de teste
describe('Central de Atendimento ao Cliente TAT', function() {
    //executa antes de cada teste
    beforeEach(function(){
        cy.visit('./src/index.html');
    });

    //test case
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT');
    })

    //only faz com que so esse test case seja realizado
    it('preenche os campos obrigatórios e envia o formulário',function(){
        const txt = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste'

        cy.get('#firstName').type('Pedro');
        cy.get('#lastName').type('Virt');
        cy.get('#email').type('teste@example.com');
        cy.get('#open-text-area').type(txt ,{delay: 0});
        cy.contains('button','Enviar').click();

        cy.get('.success').should('be.visible');
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function(){
        cy.get('#firstName').type('Pedro');
        cy.get('#lastName').type('Virt');
        cy.get('#email').type('teste@.com');
        cy.get('#open-text-area').type('Teste');
        cy.contains('button','Enviar').click();

        cy.get('.error').should('be.visible');
    });

    it('campo telefone só aceita números',function(){
        cy.get('#phone')
          .type('abdc')
          .should('have.value','');
    })

    it('exibe mensagem de erro quando telefone se torna obrigatorio mas nao é preenchido',function(){
        cy.get('#firstName').type('Pedro');
        cy.get('#lastName').type('Virt');
        cy.get('#email').type('teste@example.com');
        cy.get('#open-text-area').type('teste');
        cy.get('#phone-checkbox').check();
        cy.contains('button','Enviar').click();
        

        cy.get('.error').should('be.visible');
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
        cy.get('#firstName').type('Pedro').should('have.value','Pedro').clear().should('have.value','');
        cy.get('#lastName').type('Virt').should('have.value','Virt').clear().should('have.value','');
        cy.get('#email').type('teste@example.com').should('have.value','teste@example.com').clear().should('have.value','');
        cy.get('#phone').type('12345').should('have.value','12345').clear().should('have.value','');
    });

    it('exibe mensagem de erro ao nao digitar os campos obrigatorios',function(){
        cy.contains('button','Enviar').click();
        cy.get('.error').should('be.visible');
    });

    it('envia formulario com sucesso com comando customizado',function(){
        cy.fillMandatoryFieldsAndSubmit();
    });


    it('seleciona um produto pelo value',function(){
        cy.get('#product').select('youtube').should('have.value','youtube');
    });

    it('seleciona pelo nome',function(){
        cy.get('#product').select('YouTube').should('have.value','youtube');
    });

    it('seleciona pelo index',function(){
        cy.get('#product').select(4).should('have.value','youtube');
    });

    it('Marca o tipo de atendimento feedback',function(){
        cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('have.value','feedback');
    });

    //usa o each() para iterar pelos elementos, e o wrap para poder usar os comandos do cypress com os elementos JQuery
    it('Verificar cada radio',function(){
       cy.get('input[type="radio"]')
       //a coleção retornada deve ter 3 elementos nela
       .should('have.length',3)
       .each(function(radio){
            cy.wrap(radio).check();
            //verifica se o elemento está checado
            cy.wrap(radio).should('be.checked');
            //console.log(radio.val());
       });
    });

    it('Marcar e desmarcar checkboxes',function(){
        cy.get('#phone-checkbox')
          .check()
          .should('be.checked')
          .uncheck()
          .should('not.be.checked');
    });

    it('Marca ambos checkboxes e desmarca o ultimo',function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        // .each((check)=>cy.wrap(check).should('be.checked')) //verifica se os dois elementos estao checados
        .last() //pega o ultimo elemento
        .uncheck()
        .should('not.be.checked');
    })

    it('Seleciona um arquivo da pasta fixtures',function(){
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function(input){
            expect(input[0].files[0].name).to.equal('example.json'); //verificação de que o nome do arquivo é example.json
        });
        // .should('have.value','C:\\fakepath\\example.json');
    })

    it('Seleciona um arquivo simulando drag and drop',function(){
        cy.get('#file-upload')
        .should('not.have.value')
        //objeto de opções
        .selectFile('cypress/fixtures/example.json',{
            //simula o drag and drop
            action: 'drag-drop'
        })
        .should(function(input){
            expect(input[0].files[0].name).to.equal('example.json'); //verificação de que o nome do arquivo é example.json
        });
    });

    it('Seleciona um arquivo utilizando uma fixture com um alias',function(){
        //da um alias para o arquivo para poder ser utilizado mais facilmente com @alias
        cy.fixture('example.json').as('sampleFile');
        cy.get('#file-upload')
        .selectFile('@sampleFile')
        .should(function(input){
            expect(input[0].files[0].name).to.equal('example.json'); //verificação de que o nome do arquivo é example.json
        });
    });

    //em outras abas

    it('Verifica que a politica de privacidade abre em outra aba',function(){
        cy.get('#privacy a').should('have.attr','target','_blank');
    });

    it('Acessa a pagina de plitica de privacidade retirando o target',function(){
        // cy.get('#privacy a').click();
        cy.get('#privacy a')
        .invoke('removeAttr','target')
        .click();

        cy.contains('Talking About Testing').should('be.visible');


    });

})
  