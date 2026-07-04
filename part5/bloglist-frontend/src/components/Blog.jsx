import { useNavigate } from "react-router-dom"

const Blog = ({ blog,  updateBlog, deleteBlog, user }) => {

  const navigate = useNavigate()

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


  return(
    <>
      <h2>{blog.title}</h2>
      <p style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer', margin: '0'}}>{blog.url}</p>
      <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
        <p>likes: {blog.likes}</p>
        {user && <button style={{display: 'inline-block'}} onClick={incrementLikes}>Like</button>}
      </div>
      <p>Added by {blog.author}</p>
      {user && <button onClick={eliminar}>Remove</button>}
      
    </>
    )
}

export default Blog