describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('EXTERNAL_API')}/testing/reset`)
    const user = {
      name: 'David Martos',
      username: 'david',
      password: 'password'
    }
    cy.request('POST', `${Cypress.env('EXTERNAL_API')}/users`, user)
  })
  it('Login form is shown', function() {
    cy.visit('')
    cy.contains('blogs')
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('david')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('David Martos logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('invalidusername')
      cy.get('#password').type('invalidpassword')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain','invalid username or password')
        .and('have.css', 'border-style', 'solid')
        .and('have.css', 'color', 'rgb(248, 7, 7)')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'david', password: 'password' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('new post')
      cy.get('#author').type('David Martos')
      cy.get('#url').type('www.davidmartos.com')

      cy.get('form').submit()

      cy.get('.blog').first().should('contain','new post')
    })

    describe('and a blog exist', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'new post',
          author: 'David Martos',
          url: 'www.davidmartos.com'
        })
      })
      it('I can like a blog', function() {
        cy.get('.blog button').should('contain','view').click()
        cy.get('.blog button#like').click()
  
        cy.get('.blog').first().should('contain','likes: 1')
      })

      it('I can to remove a blog', function() {  
        cy.get('form').submit()
        cy.get('.blog button').should('contain','view').click()
        cy.get('.blog button#remove-blog').click()
  
        cy.get('html').should('not.contain','new post')
      })

      describe('login a user different', function() {
        beforeEach(function(){
          const user = {
            name: 'Herminia Sandoval',
            username: 'herminia',
            password: 'password'
          }
          cy.request('POST', `${Cypress.env('EXTERNAL_API')}/users`, user)
          cy.visit('')
          cy.login({ username: 'herminia', password: 'password' })
        })

        it('I can not to remove a blog of other user', function() {
          cy.get('.blog button').should('contain','view').click()
          cy.get('.blog').should('contain', 'David Martos')
          cy.get('.blog').should('not.contain','Remove')    
        })
      })

      describe('Creating more posts with likes', function() {
        beforeEach(function() {
          cy.createBlog({
            title: 'This post has 5 likes',
            author: 'David Martos',
            url: 'www.davidmartos.com',
            likes: 5
          })
          cy.createBlog({
            title: 'This post has 2 likes',
            author: 'David Martos',
            url: 'www.davidmartos.com',
            likes: 2
          })
        })
        
        it('Posts should be ordered by likes from lowest to highest', function() {
          cy.get('.blog').each(($el, index, $list) => {
              let likes = 0
              cy.get('.blog').eq(index).find('button').should('contain','view').click()
              cy.get('.blog')
              .eq(index)
              .find('button#like')
              .prev()
              .invoke('text')
              .then((text) => {
                if (index === 0) {
                  likes = parseInt(text.trim())
                } else {
                  expect(parseInt(text.trim())).to.be.greaterThan(likes)
                  likes = parseInt(text.trim())
                }
              })
              
          })
        })
      })
    })
  })
})