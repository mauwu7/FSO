import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import {Routes, Route, Link, useNavigate} from 'react-router-dom' //Agregado recientemente
import Notification from './components/Notification'
import BlogForm  from './components/BlogForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState([null,''])
  
  const navigate = useNavigate()

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
      </div>

      <Routes>
        <Route path='/' element={ <BlogList blogs={ blogs }  updateBlog={ updateBlog } deleteBlog={ deleteBlog }/> }/>
        <Route path='/login' element={ <LoginForm handleLogin={ handleLogin }/> }/>
        <Route path='/blog/:id' element={ <Blog />}/>
      </Routes>

    </>
  )



  // if(!user){
  //   return (
  //     <>
  //       <Notification message={ message }/>
  //       <form data-testid='form-login' onSubmit={ handleLogin }>
  //         <h2>Login</h2>
  //         <p>
  //           <label>
  //             Username <input type='text' value={ username } onChange={ ( { target } ) => setUsername(target.value) }/>
  //           </label>
  //         </p>
  //         <p>
  //           <label>
  //             Password <input type='password' value={ password } onChange={ ( { target } ) => setPassword(target.value) }/>
  //           </label>
  //         </p>
  //         <button type='submit'>login</button>
  //       </form>
  //     </>
  //   )
  // }
  // else{
  //   return (
  //     <>
  //       <Notification message={ message }/>
  //       <div>
  //         <div style={  { display: 'flex', gap: '10px' } }>
  //           <p>{ user.username } logged in</p>
  //           <button onClick= { handleLogout } style={ { alignSelf: 'center' } } >Log out</button>
  //         </div>

  //         { blogs.length === 0 ? <p>No hay ningun blog por el momento :c</p>:
  //           <div>
  //             <h2>Blogs</h2>
  //             <ul style= { { listStyle: 'none', padding: 0, lineHeight: '1em' } } >
  //               {blogs.sort((a,b) => b.likes-a.likes).map((blog) => <Blog key= { blog.id } blog= { blog } updateBlog= { updateBlog } deleteBlog= { deleteBlog }/>)}
  //             </ul>
  //           </div>
  //         }
  //         <Togglable buttonLabel="Show form">
  //           <BlogForm addBlog={ addBlog } />
  //         </Togglable>
  //       </div>
  //     </>
  //   )
  // }

}

export default App
