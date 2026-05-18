import { useState } from "react"

export default function BlogForm ({addBlog}) {
  
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [url, setUrl] = useState('')

  const submitBlog = (event) => {
    event.preventDefault()
    addBlog({title: titulo, author: autor, url: url})
    setTitulo('')
    setAutor('')
    setUrl('')
  }
    
  return(
        <form onSubmit={submitBlog}>
          <h2>Create new blog</h2>
          <p>
            <label>
              titulo: <input type='text' value={titulo} onChange={({target}) => setTitulo(target.value)}/>
            </label>
          </p>
          <p>
            <label>
              autor: <input type='text' value={autor} onChange={({target}) => setAutor(target.value)}/>
            </label>
          </p>
          <p>
            <label>
              url: <input type='text' value={url} onChange={({target}) => setUrl(target.value)}/>
            </label>
          </p>
          <button type='submit'>Crear</button>
        </form>
    )
}

