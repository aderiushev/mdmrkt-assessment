/// <reference types="cypress" />

describe('issues search', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('search for something and ensure the keyword presented in the list', () => {
    cy.get('[data-testid="search-input"]').type('something')
    cy.get('[data-testid="search-button"]').click()
    cy.get('[data-testid="issues-list"]').contains('something')
    cy.get('[data-testid="issue-item-status"]').contains('OPEN')
  })

  it('search by closed tickets', () => {
    cy.get('[data-testid="search-input"]').type('something')
    cy.get('[data-testid="status-select"]').select('CLOSED')
    cy.get('[data-testid="search-button"]').click()
    cy.get('[data-testid="issues-list"]').contains('something')
    cy.get('[data-testid="issue-item-status"]').contains('CLOSED')
  })

  it('search for non-existing item', () => {
    cy.get('[data-testid="search-input"]').type('wejrhkwejhrkj3wh4rkjwhekjrhwkjehrkj')
    cy.get('[data-testid="search-button"]').click()
    cy.get('[data-testid="issues-list"]').should('be.empty')
  })
})
