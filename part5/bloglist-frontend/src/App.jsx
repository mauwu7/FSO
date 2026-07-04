import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom' //Agregado recientemente
import Notification from './components/Notification'
import BlogForm  from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState([null,''])
  
  const navigate = useNavigate()

  const match = useMatch('blog/:id')
  const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

  const padding = {
    padding: 5
  }

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
      setMessage([true,'Error: credenciales invalidas'])
      setTimeout(() => setMessage([null,'']),3000)
    }
  }

  const updateBlog = async (updated, id) => {
    const actualizado = await blogService.updateBlog(updated,id)
    const updatedList = blogs.filter((blog) => blog.id!==id)
    setBlogs([...updatedList, actualizado])
  }

  const addBlog =  async (blog) => {
    const newBlog = await blogService.addBlog(blog)
    setBlogs([...blogs,newBlog])
    setMessage([false,'Se ha agregado un nuevo blog'])
    setTimeout(() => setMessage([null,'']),3000)
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

    <>
      <Notification message={message} />
      <div>
        <Link style={ padding } to="/">Blogs</Link>
        { !user ? <Link style={ padding } to='/login'>Login</Link>:<Link style={ padding } to='/'><button onClick={handleLogout}>Log out</button></Link> }
        {user && <Link style={ padding } to='/create'>New blog</Link>}
      </div>

      <Routes>
        <Route path='/' element={ <BlogList blogs={ blogs }  updateBlog={ updateBlog } deleteBlog={ deleteBlog }/> }/>
        <Route path='/login' element={ <LoginForm handleLogin={ handleLogin }/> }/>
        <Route path='/blog/:id' element={ <Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user}/>}/>
        <Route path='/create' element={ <BlogForm addBlog={addBlog}/>}/>
      </Routes>

    </>
  )
}

export default App
