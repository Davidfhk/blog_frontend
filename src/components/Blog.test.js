import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogFormCreate from './BlogFormCreate'

test('renders content', () => {// eslint-disable-line
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'David Ignacio Martos'
  }

  const component = render(
    <Blog blog={blog} />
  )
  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(// eslint-disable-line
    'Component testing is done with react-testing-library'
  )
  expect(div).not.toHaveTextContent(// eslint-disable-line
    'David Ignacio Martos'
  )
  expect(div).not.toHaveTextContent(// eslint-disable-line
    'likes'
  )
  expect(div).not.toHaveTextContent(// eslint-disable-line
    'url'
  )
//   component.debug()
})

test('Show url and likes when clicked view button', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'David Ignacio Martos',
    url: 'www.david.com'
  }

  const component = render(
    <Blog blog={blog} />
  )
  
  const button = component.getByText('view')

  fireEvent.click(button)
  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(// eslint-disable-line
    'url: www.david.com'
  )
  expect(div).toHaveTextContent(// eslint-disable-line
    'likes: '
  )
})

test('It should call two times at likes event', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'David Ignacio Martos',
    url: 'www.david.com',
    user: {
      id: 1
    }
  }
  
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} addLike={mockHandler} />
  )
  
  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('It should to create a blog with the form', () => {

  const createBlog = jest.fn()
  const component = render(
    <BlogFormCreate createBlog={createBlog} />
  )
  
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const form = component.container.querySelector('form')

  fireEvent.change(title, { 
    target: { value: 'Component testing is done with react-testing-library' } 
  })

  fireEvent.change(author, { 
    target: { value: 'David Ignacio Martos' } 
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Component testing is done with react-testing-library' )
  expect(createBlog.mock.calls[0][0].author).toBe('David Ignacio Martos')
})