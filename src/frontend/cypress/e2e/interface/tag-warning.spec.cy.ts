describe('Teste de interface - Tags de aviso de inconformidade no CSV', () => {
    it('Verifica se as tags de aviso estão presentes', () => {
      cy.visit('http://localhost:3000/') // Substitua pela URL do seu aplicativo

       // Seleciona o arquivo no input file
      const fileName = 'file_model - file_model.csv'; 
      cy.fixture(fileName).then(fileContent => {
        cy.get('input[type="file"]').attachFile({
          fileContent: fileContent.toString(),
          fileName: fileName,
          mimeType: 'text/csv'
        });

      });

      // Ativa o botão para dar continuidade ao teste
      cy.get('button').contains('Enviar').click();
  
      cy.get('.toaster').each(tag => {
        cy.wrap(tag)
          .find('.go4109123758')
          .should('exist')
      })
    })
  })