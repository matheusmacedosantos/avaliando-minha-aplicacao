/* Teste  de interface da aplicação - caso 1 - distribuição lista de links*/

describe('Teste de interface - Campo para inserir arquivo CSV', () => {
    it('Verifica se o campo está presente', () => {
      cy.visit('http://localhost:3000/')
  
      cy.get('input[type="file"]').should('exist')
    })
  })





