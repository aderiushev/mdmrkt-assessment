/// <reference types="cypress" />

describe('details', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('verify the existing issue is displayed', () => {
    cy.get('[data-testid="search-input"]').type('something')
    cy.get('[data-testid="search-button"]').click()
    cy.get('[data-testid="issues-list"]').first().get('[data-testid="issues-list-item-title-0"]').click()
    cy.get('[data-testid="issue-details-container"]').contains('something')
  })

  it('verify the non-existing issue throws and display an error', () => {
    cy.visit('http://localhost:3000/details/0')
    cy.get('[data-testid="issue-details-error"]').should('exist')
  })
})
