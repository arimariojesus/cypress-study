import { format } from '../support/utils'

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
  
  it('Should have correct total balance', () => {
    
    cy.findByText('Nova transação').click()
    cy.findByPlaceholderText('Título').type('Mesada')
    cy.findByPlaceholderText('Valor').type('500')
    cy.findByText('Entrada').click()
    cy.findByPlaceholderText('Categoria').type('Fixo')
    cy.findByText('Cadastrar').click()
    
    cy.findByText('Nova transação').click()
    cy.findByPlaceholderText('Título').type('Pizza')
    cy.findByPlaceholderText('Valor').type('100')
    cy.findByText('Saída').click()
    cy.findByPlaceholderText('Categoria').type('Comida')
    cy.findByText('Cadastrar').click()

    let incomes = 0
    let expenses = 0

    cy.get('table > tbody > tr')
      .each(($el) => {
        const $transaction = $el.find('td.deposit, td.withdraw')
        
        if ($transaction.hasClass('deposit')) {
          incomes += format($transaction.text())
        } else {
          expenses += -(format($transaction.text()))
        }

      })
    
    cy.get('.highlight-background > strong').invoke('text').then(text => {
      const formattedTotalDisplay = format(text)
      const expectedTotal = incomes + expenses

      expect(formattedTotalDisplay).to.eq(expectedTotal)
    })
    
  })
})
