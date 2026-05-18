import { useState, useEffect, use } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm  from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState([null,''])


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

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({username, password})  
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      
      setUser(user)
      blogService.setToken(user.token)

      setUsername('')
      setPassword('')
    }catch{
      setMessage([true,'Error: credenciales invalidas'])
      setTimeout(() => setMessage([null,'']),3000)
    }
  }

  const addBlog =  async (blog) => {
    const newBlog = await blogService.addBlog(blog)
    setBlogs([...blogs,newBlog])
    setMessage([false,'Se ha agregado un nuevo blog'])
    setTimeout(() => setMessage([null,'']),3000)
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    blogService.setToken(null)
  }

  if(!user){
    return (
      <>
      <Notification message={message}/>
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <p>
            <label>
              Username <input type='text' value={username} onChange={({target}) => setUsername(target.value)}/>
            </label>
          </p>
          <p>
            <label>
              Password <input type='password' value={password} onChange={({target}) => setPassword(target.value)}/>
            </label>
          </p>
          <button type='submit'>login</button>
        </form>
      </>
    )
  }
  else{
    return (
      <>
      <Notification message={message}/>
      <div>
        <div style={{display: 'flex', gap: '10px'}}>
          <p>{user.username} logged in</p>
          <button onClick={handleLogout} style={{alignSelf: 'center'}}>Log out</button>
        </div>

        {blogs.length == 0 ? <p>No hay ningun blog por el momento :c</p>:<div>
        
          <h2>Blogs</h2>
          <ul>
           {blogs.map((blog) => <Blog key={blog.id} blog={blog}/>)} 
          </ul>          
          </div>
          }
          <Togglable buttonLabel="Show form">
            <BlogForm addBlog={addBlog} />
          </Togglable>
      </div>
      </>
    )
  }
}

export default App
