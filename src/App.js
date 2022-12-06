import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogFormCreate from './components/BlogFormCreate'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setNewUserName] = useState('')
  const [password, setNewPassword] = useState('')
  const [user, setUser] = useState(null)
  const [ notification, setNotification ] = useState({message: null, type: null})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJson = localStorage.getItem('loginJSON')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // event controllers
  
  const handleChangeUserName = (event) => {
    setNewUserName(event.target.value)
  }

  const handleChangePassword = (event) => {
    setNewPassword(event.target.value)
  }

  const handleSubmitLogin = async (event) => {
    event.preventDefault()
      const user = await loginService.login({username,password})
      .catch(error =>{
        setNotification({message: error.response.data.error, type: 'error'})
        setTimeout(() => {
          setNotification({message: null, type: null})
        }, 5000)
      })
      if (user) {
        localStorage.setItem('loginJSON',JSON.stringify(user))
        setUser(user)
        blogService.setToken(user.token)
        setNewUserName('')
        setNewPassword('')
      }
  }

  const handleLogout = () => {
    loginService.logout()
    setUser(null)
  }

  const loginForm = () => {
    return <>
        <Login 
        username={username} 
        password={password} 
        handleChangeUserName={handleChangeUserName} 
        handleChangePassword={handleChangePassword}
        handleSubmit={handleSubmitLogin}/>
    </>
  }

  const addBlog = async (blogObject) => {
    const newBlog = await blogService.create(blogObject)
    .catch(error =>{
      setNotification({message: error.response.data.error, type: 'error'})
      setTimeout(() => {
        setNotification({message: null, type: null})
      }, 5000)
    })
    if (newBlog) {
      blogFormRef.current.toggleVisibility()
      setNotification({message: `a new blog ${newBlog.title} by ${newBlog.author}`, type: 'success'})
      setTimeout(() => {
        setNotification({message: null, type: null})
      }, 5000)
      newBlog.user = {
        username: user.username,
        name: user.name,
        id: newBlog.user
      }
      setBlogs(blogs.concat(newBlog))
    }
  }

  const blogFormRef = useRef()

  const blogFormCreate = () => {
    return <>
      <Togglable buttonLabel= 'new blog' ref={blogFormRef}>
        <BlogFormCreate createBlog={addBlog}/>
      </Togglable>
    </>
  }

  const addLike = async (blogObject) => {
    const updatedBlog = await blogService.update(blogObject)
    .catch(error =>{
      setNotification({message: error.response.data.error, type: 'error'})
      setTimeout(() => {
        setNotification({message: null, type: null})
      }, 5000)
    })
    if (updatedBlog) {
      setBlogs(blogs.map((blog) => {
        if (blog.id === updatedBlog.id) {
          blog.likes = updatedBlog.likes
        }
        return blog
      }))
    }
  }

  const removeBlog = async (blogObject) => {
    const removeBlog = window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)
    if (removeBlog) {
      const removedBlog = await blogService.remove(blogObject)
      .catch(error =>{
        setNotification({message: error.response.data.error, type: 'error'})
        setTimeout(() => {
          setNotification({message: null, type: null})
        }, 5000)
      })
      if (removedBlog === 204) {
          setBlogs(blogs.filter(blogs => {
            return blogs.id !== blogObject.id
          }))
      }
    }
  }

  const allBlogs = () => {
    const sortBlogs = blogs.sort((a, b) => a.likes - b.likes)
    return sortBlogs.map(blog =>
      <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog}/>
    )
  }

  return (
    <div>
      <Notification notification={notification}/>
      <h2>blogs</h2>
      {
        user === null ?
        <div>
          <h2>Log in to application</h2>
          {
             loginForm()
          }
        </div>:
        <div>
          <div>
            <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
          </div>
          {
            blogFormCreate()
          }
          {
            allBlogs()
          }
        </div>
         
      }
    </div>
  )
}

export default App
