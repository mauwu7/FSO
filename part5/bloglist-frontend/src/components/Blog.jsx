import { useNavigate } from "react-router-dom"
import styled from 'styled-components'
import { Button } from '@mui/material'

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

  const eliminar = () => {
    deleteBlog(blog.id)
    navigate('/')
  }



  return(
    <Card>
      <h2>{blog.title}</h2>
      <p style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer', margin: '0'}}>{blog.url}</p>
      <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
        <p style={{color: '#656565'}}>Likes: {blog.likes}</p>
        {user && <Button onClick={incrementLikes} variant="outlined">Like</Button>}
        {(user?.id === blog?.user) ? <Button onClick={eliminar} variant="outlined" sx={{borderColor: 'red', color: 'red'}}>Remove</Button>: <></>}
      </div>
      <p style={{color: '#656565'}}>Added by {blog.author}</p>
    </Card>
    )
}

  const Card = styled.div `
    font-family: "Roboto", sans-seriff;
    box-shadow: 1px 1px 5px grey;
    padding: 5px;
    margin-top: 10px;

  `

export default Blog