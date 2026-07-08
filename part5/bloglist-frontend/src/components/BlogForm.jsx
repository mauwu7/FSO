import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function BlogForm ({ addBlog }) {
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [url, setUrl] = useState('')
  const navigate = useNavigate()
  
  const submitBlog = async (event) => {
    event.preventDefault()
    await addBlog({ title: titulo, author: autor, url: url })
    setTitulo('')
    setAutor('')
    setUrl('')
    navigate('/')

  }
  return(
    
    <form onSubmit={ submitBlog }>
      <h2>Create new blog</h2>

      <div>  
        <TextField label="titulo" value={ titulo } onChange={ event => setTitulo(event.target.value) }/>
      </div>

      <div style={{ marginTop: 10}}>
        <TextField label="autor" value={ autor } onChange={ event => setAutor(event.target.value) }/>
      </div>

      <div style={{ marginTop: 10}}>
        <TextField label="url" value={ url } onChange={ event => setUrl(event.target.value) }/>
      </div>

      <Button type='submit' variant='contained' style={{ marginTop: 10}}>Crear</Button>

    </form>
  )
}

