import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)


  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      console.log("Hola desde acaaa")
      const user = await loginService.login({username, password})
      setUser(user)
      setUsername('')
      setPassword('')
    }catch{
      setMessage('Error al iniciar sesion!')
      setTimeout(() => setMessage(null),3000)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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
              Password <input type='text' value={password} onChange={({target}) => setPassword(target.value)}/>
            </label>
          </p>
          <button type='submit'>login</button>
        </form>
      </>
    )
  }
  else{
    return (
      <div>
        <p>{username} logged in</p>
        {blogs.length == 0 ? <p>No hay ningun blog por el momento :c</p>:<div>
          <h2>Blogs</h2>
          <ul>
           {blogs.map((blog) => <Blog key={blog.id} blog={blog}/>)} 
          </ul>          
          </div>
          }
      </div>
    )
  }

}

export default App
