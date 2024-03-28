describe('Teste de interface - Botão para salvar arquivo CSV', () => {
    it('Verifica se o botão está presente', () => {
    cy.visit('http://localhost:3000/')

    cy.get('button[type="submit"]').should('exist')
    cy.get('button[type="submit"]').should('have.text', 'Enviar')
    })
})