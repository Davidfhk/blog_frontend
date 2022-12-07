import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog }) => {
  const [viewDetails, setViewDetails] = useState(false)

  const blogStyle = {
    container: {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    },
    generic: {
      marginLeft: '5px'
    },
    buttonRemove: {
      marginTop: '10px',
      backgroundColor: '#ff2c2c',
      color: 'white'
    }
  }

  const handleOnClick = () => {
    setViewDetails(!viewDetails)
  }

  const handleAddLikes = () => {
    addLike({
      id: blog.id,
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })
  }

  const handleRemoveBlog = () => {
    removeBlog({
      id: blog.id,
      author: blog.author,
      title: blog.title
    })
  }

  const showRemoveButton = () => {
    const user = JSON.parse(localStorage.getItem('loginJSON')) // eslint-disable-line
    if (user.username === blog.user.username) {
      return <button style={blogStyle.buttonRemove} onClick={handleRemoveBlog}>Remove</button>
    }
  }

  const showDetails = () => {
    if (viewDetails) {
      return (
        <>
          {blog.url}<br />
          Likes: {blog.likes}<button style={blogStyle.generic} onClick={handleAddLikes}>like</button><br />
          {blog.author}<br />
          {
            showRemoveButton()
          }

        </>
      )
    }
  }

  return (
    <div style={blogStyle.container}>
      {blog.title}<button style={blogStyle.generic} onClick={handleOnClick}>{viewDetails ? 'hide' : 'view'}</button><br />
      {showDetails()}
    </div>
  )
}

export default Blog
