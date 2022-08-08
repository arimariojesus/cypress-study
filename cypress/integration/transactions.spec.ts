import { format } from '../support/utils'

interface TransactionReturn {
  title: string
  value: string
}

const makeIncomingTransaction = (): TransactionReturn => {
  cy.findByText('Nova transação').click()
  cy.findByPlaceholderText('Título').type('Mesada')
  cy.findByPlaceholderText('Valor').type('500')
  cy.findByText('Entrada').click()
  cy.findByPlaceholderText('Categoria').type('Fixo')
  cy.findByText('Cadastrar').click()

  return { title: 'Mesada', value: '500' }
};

const makeExpenseTransaction = (): TransactionReturn => {
  cy.findByText('Nova transação').click()
  cy.findByPlaceholderText('Título').type('Pizza')
  cy.findByPlaceholderText('Valor').type('100')
  cy.findByText('Saída').click()
  cy.findByPlaceholderText('Categoria').type('Comida')
  cy.findByText('Cadastrar').click()

  return { title: 'Pizza', value: '100' }
};

describe('ari.money', () => {
  beforeEach(() => {
    cy.visit('')
    cy.get('table > tbody > tr').should('have.length', 0)
  })
  
  it('Should register a new incoming transaction', () => {
    makeIncomingTransaction()

    cy.get('table > tbody > tr').should('have.length', 1)
  })
  
  it('Should register a new expense transaction', () => {
    makeExpenseTransaction()

    cy.get('table > tbody > tr').should('have.length', 1)
  })
  
  it('Should remove transactions correctly', () => {
    const income = makeIncomingTransaction()
    const expense = makeExpenseTransaction()

    cy.get('table > tbody > tr').should('have.length', 2)

    cy.get('table > tbody')
      .contains(income.title)
      .parent()
      .findByAltText('Remover transação')
      .click()

    cy.get('table > tbody > tr').contains(income.title).should('not.exist')
    cy.get('table > tbody > tr').should('have.length', 1)

    cy.get('table > tbody')
      .contains(expense.title)
      .parent()
      .findByAltText('Remover transação')
      .click()

    cy.get('table > tbody > tr').should('have.length', 0)
  })
  
  it('Should have correct balance', () => {
    
    makeIncomingTransaction()
    makeExpenseTransaction()

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
