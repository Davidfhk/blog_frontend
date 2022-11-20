import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogFormCreate from './components/BlogFormCreate'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setNewTitle] = useState('')
  const [author, setNewAuthor] = useState('')
  const [url, setNewUrl] = useState('')
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

  const handleChangeTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const handleChangeAuthor = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleChangeUrl = (event) => {
    setNewUrl(event.target.value)
  }

  const handleSubmitBlogFormCreate = async (event) => {
    event.preventDefault()
    const newBlog = await blogService.create({title,author,url})
    .catch(error =>{
      setNotification({message: error.response.data.error, type: 'error'})
      setTimeout(() => {
        setNotification({message: null, type: null})
      }, 5000)
    })
    if (newBlog) {
      setNotification({message: `a new blog ${newBlog.title} by ${newBlog.author}`, type: 'success'})
      setTimeout(() => {
        setNotification({message: null, type: null})
      }, 5000)
      setBlogs(blogs.concat(newBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    }
  }

  const blogFormCreate = () => {
    return <>
        <BlogFormCreate 
        title={title} 
        author={author}
        url={url} 
        handleChangeTitle={handleChangeTitle} 
        handleChangeAuthor={handleChangeAuthor}
        handleChangeUrl={handleChangeUrl}
        handleSubmit={handleSubmitBlogFormCreate}/>
    </>
  }

  const allBlogs = () => {
    return blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
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
