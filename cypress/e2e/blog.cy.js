describe('template spec', () => {
  it('It should to do login', () => {
    cy.visit('http://localhost:3000')
    cy.contains('blogs')
    cy.get('#username').type('testusername')
    cy.get('#password').type('test')
    cy.get('#login-button').click()

    cy.contains('david logged in')
  })
})