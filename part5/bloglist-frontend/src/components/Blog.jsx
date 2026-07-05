import { useNavigate } from "react-router-dom"

const Blog = ({ blog,  updateBlog, deleteBlog, user }) => {

  const navigate = useNavigate()

  //El error esta en que se modifica la estrucutra original del documento blogs. Porque se cambia el objeto user por el id, en vez del username

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

  const eliminar = async () => {
    await deleteBlog(blog.id)
    navigate('/')
  }

  // console.log(user)
  // console.log(blog)

  return(
    <>
      <h2>{blog.title}</h2>
      <p style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer', margin: '0'}}>{blog.url}</p>
      <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
        <p>likes: {blog.likes}</p>
        {user && <button style={{display: 'inline-block'}} onClick={incrementLikes}>Like</button>}
      </div>
      {(user != null) ? (user.username === blog.user.username) 
      ? <button onClick={eliminar}>Remove</button>:<></>
      :<></>}
      <p>Added by {blog.author}</p>
      {}
    </>
    )
}

export default Blog