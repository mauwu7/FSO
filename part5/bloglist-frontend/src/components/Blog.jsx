import { useState } from 'react'

const Blog = ({ blog,  updateBlog, deleteBlog }) => {

  const [showDetails, setShowDetails] = useState(false)

  const incrementLikes = () => {

    const sent= {
      title:blog.title,
      url: blog.url,
      likes: blog.likes+1,
      author: blog.author,
      user:blog.user._id
    }
    updateBlog(sent, blog.id)
  }

  const eliminar = () => {
    deleteBlog(blog.id)
  }
  return(
    <div style={ { marginBottom: '10px', border: '1px solid black' } }>
      <div style={ { display: 'flex', alignItems: 'center', gap: '20px' } }>
        <h4>{ blog.title }</h4>
        <button onClick={ () => setShowDetails(!showDetails) }>{ showDetails? "Ocultar detalles" : "Mostrar detalles" }</button>
      </div>

      { showDetails &&
        <ul style={ { padding: '0', listStyle: 'none' } }>
          <li>Autor: { blog.author }</li>
          <li>Url: { blog.url }</li>
          <li>likes: { blog.likes } <button onClick={ incrementLikes }>Like</button></li>
          <li style={ { marginTop: '10px' } }><button onClick={ eliminar }>Eliminar</button></li>
        </ul>
      }
    </div>)
}

export default Blog