import axios from 'axios'


const baseUrl = '/api/blogs'

let token=null

const setToken = newToken => token = `Bearer ${newToken}`

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  console.log(response.data)
  return response.data
}

const updateBlog = async (updatedBlog, id) => {
  const response = await axios.put(`${baseUrl}/${id}`,updatedBlog)
  return response.data
}

const deleteBlog = async (id) => {
  const config ={
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${id}`,config)
}

// const getDecodedToken = (tokenDecoded) => {
//   return jwt.verify(tokenDecoded, process.env.SECRET)
// }

export default { getAll, addBlog, setToken, updateBlog, deleteBlog}