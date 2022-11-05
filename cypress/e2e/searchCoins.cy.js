context('Select a cryptocurrency to search', () => {
  it('Selecting the cryptocurrency Dacxi', () => {
    cy.visit('http://localhost:8080/')
    cy.wait(2500)
    cy.get('select').select('dacxi').should('have.value', 'dacxi')
    cy.get('div[data-testid=\"datepicker\"').click()
    cy.get('[aria-label="Previous month"]').click()
    cy.get('.dp__calendar_item').contains('15').click()
    cy.get('.dp__select').click()
  })

  it('Selecting another date for Dacxi', () => {
    cy.wait(2000)
    cy.get('div[data-testid=\"datepicker\"').click()
    cy.get('[aria-label="Previous month"]').click()
    cy.get('.dp__calendar_item').contains('25').click()
    cy.get('.dp__select').click()
  })

  it('Selecting the cryptocurrency Ethereum', () => {
    cy.wait(2000)
    cy.get('select').select('ethereum').should('have.value', 'ethereum')
    cy.get('div[data-testid=\"datepicker\"').click()
    cy.get('[aria-label="Previous month"]').click()
    cy.get('.dp__calendar_item').contains('10').click()
    cy.get('.dp__select').click()
  })

  it('Selecting another date for Ethereum', () => {
    cy.wait(2000)
    cy.get('div[data-testid=\"datepicker\"').click()
    cy.get('[aria-label="Previous month"]').click()
    cy.get('.dp__calendar_item').contains('13').click()
    cy.get('.dp__select').click()
  })

  it('Selecting the cryptocurrency Luna', () => {
    cy.wait(2000)
    cy.get('select').select('terra-luna').should('have.value', 'terra-luna')
    cy.get('div[data-testid=\"datepicker\"').click()
    cy.get('[aria-label="Previous month"]').click()
    cy.get('.dp__calendar_item').contains('24').click()
    cy.get('.dp__select').click()
  })

  it('Selecting another date for Luna', () => {
    cy.wait(2000)
    cy.get('div[data-testid=\"datepicker\"').click()
    cy.get('[aria-label="Next month"]').click()
    cy.get('.dp__calendar_item').contains('28').click()
    cy.get('.dp__select').click()
  })

  it('Selecting the cryptocurrency Bitcoin', () => {
    cy.wait(2000)
    cy.get('select').select('bitcoin').should('have.value', 'bitcoin')
    cy.get('div[data-testid=\"datepicker\"').click()
    cy.get('[aria-label="Previous month"]').click()
    cy.get('.dp__calendar_item').contains('24').click()
    cy.get('.dp__select').click()
  })
})