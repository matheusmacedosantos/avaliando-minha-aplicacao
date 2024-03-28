describe('Teste de interface - Link de download de CSV padrão', () => {
    it('Verifica o link de download do arquivo CSV', () => {
      cy.visit('http://localhost:3000/') 
  
      cy.get('[id="linkModelo"]').should('have.text', 'download do modelo da planilha');
      cy.get('[id="linkModelo"]').click();
      
      })
    })
  

