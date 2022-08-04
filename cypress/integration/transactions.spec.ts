describe('ari.money', () => {
  beforeEach(() => {
    cy.visit('')
    cy.get('table > tbody > tr').should('have.length', 0)
  })
  
  it('Should register a new incoming transaction', () => {
    cy.findByText('Nova transação').click()
    cy.findByPlaceholderText('Título').type('Salário')
    cy.findByPlaceholderText('Valor').type('1000')
    cy.findByText('Entrada').click()
    cy.findByPlaceholderText('Categoria').type('Fixo')
    cy.findByText('Cadastrar').click()

    cy.get('table > tbody > tr').should('have.length', 1)
  })
  
  it('Should register a new outgoing transaction', () => {
    cy.findByText('Nova transação').click()
    cy.findByPlaceholderText('Título').type('Salário')
    cy.findByPlaceholderText('Valor').type('1000')
    cy.findByText('Saída').click()
    cy.findByPlaceholderText('Categoria').type('Fixo')
    cy.findByText('Cadastrar').click()

    cy.get('table > tbody > tr').should('have.length', 1)
  })
  
  it('Should remove transactions correctly', () => {
    const incoming = { title: 'Salário', value: '1000' }
    const outcoming = { title: 'Internet', value: '100' }
    
    cy.findByText('Nova transação').click()
    cy.findByPlaceholderText('Título').type(incoming.title)
    cy.findByPlaceholderText('Valor').type(incoming.value)
    cy.findByText('Entrada').click()
    cy.findByPlaceholderText('Categoria').type('Fixo')
    cy.findByText('Cadastrar').click()
    
    cy.findByText('Nova transação').click()
    cy.findByPlaceholderText('Título').type(outcoming.title)
    cy.findByPlaceholderText('Valor').type(outcoming.value)
    cy.findByText('Saída').click()
    cy.findByPlaceholderText('Categoria').type('Fixo')
    cy.findByText('Cadastrar').click()

    cy.get('table > tbody > tr').should('have.length', 2)

    cy.get('table > tbody')
      .contains(incoming.title)
      .parent()
      .findByAltText('Remover transação')
      .click()

    cy.get('table > tbody > tr').contains(incoming.title).should('not.exist')
    cy.get('table > tbody > tr').should('have.length', 1)

    cy.get('table > tbody')
      .contains(outcoming.title)
      .parent()
      .findByAltText('Remover transação')
      .click()

    cy.get('table > tbody > tr').should('have.length', 0)
  })
})
