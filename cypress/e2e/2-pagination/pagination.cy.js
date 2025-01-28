/// <reference types="cypress" />

describe('pagination', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('ensure we dont have prev. page button on the first page', () => {
    cy.get('[data-testid="search-input"]').type('something')
    cy.get('[data-testid="search-button"]').click()
    cy.get('[data-testid="prev-page-button"]').should('not.exist')
    cy.get('[data-testid="next-page-button"]').should('exist')
  })

  it('go to page 2 and ensure there is a prev. page button', () => {
    cy.get('[data-testid="search-input"]').type('something')
    cy.get('[data-testid="search-button"]').click()
    cy.get('[data-testid="issues-list"]').scrollIntoView()
    cy.get('[data-testid="next-page-button"]').click()
    cy.get('[data-testid="prev-page-button"]').should('exist')
  })

  it('go to page 2 and ensure there is a prev. page button', () => {
    cy.get('[data-testid="search-input"]').type('something')
    cy.get('[data-testid="search-button"]').click()
    cy.get('[data-testid="issues-list"]').scrollIntoView()
    cy.get('[data-testid="next-page-button"]').click()
    cy.get('[data-testid="prev-page-button"]').click()
  })
})
