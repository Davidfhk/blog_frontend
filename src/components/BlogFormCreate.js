import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogFormCreate = ({ createBlog }) => {
  const [title, setNewTitle] = useState('')
  const [author, setNewAuthor] = useState('')
  const [url, setNewUrl] = useState('')

  const handleChangeTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const handleChangeAuthor = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleChangeUrl = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title: <input id='title' value={title} onChange={handleChangeTitle} />
      </div>
      <div>
        author: <input id='author' value={author} onChange={handleChangeAuthor} />
      </div>
      <div>
        url: <input id='url' value={url} onChange={handleChangeUrl} />
      </div>
      <div>
        <button type='submit'>Create Post</button>
      </div>
    </form>
  )
}

BlogFormCreate.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogFormCreate
