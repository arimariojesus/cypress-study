describe('ari.money', () => {
  it('Should register a new incoming transaction', () => {
    cy.visit('')

    cy.get('table > tbody > tr').should('have.length', 0)

    cy.findByText('Nova transação').click()
    cy.findByPlaceholderText('Título').type('Salário')
    cy.findByPlaceholderText('Valor').type('1000')
    cy.findByText('Entrada').click()
    cy.findByPlaceholderText('Categoria').type('Fixo')
    cy.findByText('Cadastrar').click()

    cy.get('table > tbody > tr').should('have.length', 1)
  })
})
