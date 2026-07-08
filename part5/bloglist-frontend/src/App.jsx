import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom' 
import Notification from './components/Notification'
import BlogForm  from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import { Button, Container, Toolbar, AppBar } from '@mui/material'



const App = () => {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  
  const navigate = useNavigate()

  const match = useMatch('blog/:id')
  const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

  const style = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login( { username, password } )
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      navigate('/')
    } catch {
      setMessage({ text: 'Wrong credentials!', type: 'error' })
      setTimeout(() => setMessage(null),3000)
    }
  }

  const updateBlog = async (updated, id) => {
    const actualizado = await blogService.updateBlog(updated,id)
    // console.log(actualizado) 
    const updatedList = blogs.filter((blog) => blog.id!==id)
    setBlogs([...updatedList, actualizado])
  }

  const addBlog =  async (blog) => {
    const newBlog = await blogService.addBlog(blog)
    setBlogs([...blogs,newBlog])
    setMessage({ text: 'Blog added succesfully!', type: 'success' })
    setTimeout(() => setMessage(null), 3000)
  }

  const deleteBlog = async(id) => {
    await blogService.deleteBlog(id)
    setBlogs(blogs.filter((blog) => blog.id !== id))
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    blogService.setToken(null)
    navigate('/')

  }


  return(
    <Container>

      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/" sx={ style }>Home</Button>
          { !user ? <Button color="inherit" component={Link} to="/login" sx={ style }>Login</Button>:<Button color="inherit" component={Link} to="/" onClick={handleLogout} sx={ style }>Log out</Button>}
          { user && <Button color='inherit' component={Link} to="/create" sx={ style }>New Blog</Button>}
        </Toolbar>
      </AppBar>
      <Notification message={message} />
      <Routes>
        <Route path='/' element={ <BlogList blogs={ blogs }  updateBlog={ updateBlog } deleteBlog={ deleteBlog }/> }/>
        <Route path='/login' element={ <LoginForm handleLogin={ handleLogin }/> }/>
        <Route path='/blog/:id' element={ <Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user}/>}/>
        <Route path='/create' element={ <BlogForm addBlog={addBlog}/>}/>
      </Routes>

    </Container>
  )
}

export default App
