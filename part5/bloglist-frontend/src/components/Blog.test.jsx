import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'


describe('Blog test', () => {
    const blog = {
      title: 'Un nuevo blog',
      auhtor: 'Vegeta777',
      url: 'www.youtube.com',
      likes: 3
    }

    test('the component only displays the title', () => {
      const {container} = render(<Blog blog={blog}/>)

      const div = container.querySelector('.title')
      const url = screen.queryByText('www.youtube.com')
      const likes = screen.queryByText('3')
      expect(div).toHaveTextContent('Un nuevo blog')
      expect(url).toBeNull()
      expect(likes).toBeNull()
    })

    test('number of likes and url are shown when the button is clicked', async () => {
      
      const { container } = render(<Blog blog={blog}/>)

      const user = userEvent.setup()
      const button = screen.getByText('Mostrar detalles')
      await user.click(button)
      const likes = container.querySelector('.likes')
      const url = container.querySelector('.url')
      expect(likes).toHaveTextContent(`likes: ${blog.likes}`)
      expect(url).toBeVisible()
    })

    test('if the like button is clicked twice, the event handler is also called twice', async () => {

      const new_blog = {...blog, user:{_id:1313}}
      const handler = vi.fn()
      
      const {container} = render(<Blog blog={new_blog} updateBlog={handler}/>)
      const user = userEvent.setup()

      const button = screen.getByText('Mostrar detalles')
      await user.click(button)

      const like_button = container.querySelector('.like_button')

      await user.click(like_button)
      expect(handler.mock.calls).toHaveLength(1)

    })
})

describe('Blog form test',  () => {

  test('when the form gets submitted the details should fit with the expected data',  async () => {
    const handler = vi.fn()
    const user = userEvent.setup()
  
    render(<BlogForm addBlog={handler}/>)
  
    const title = screen.getByLabelText('titulo:')
    const author = screen.getByLabelText('autor:')
    const url = screen.getByLabelText('url:')

    const button = screen.getByText('Crear')
  
    await user.type(title, 'Nuevo blog')
    await user.type(author, 'Vegeta777')
    await user.type(url,'www.youtube.com')
  
    await user.click(button)

    expect(handler.mock.calls).toHaveLength(1)
    expect(handler.mock.calls[0][0]).toStrictEqual({title: 'Nuevo blog', author: 'Vegeta777', url: 'www.youtube.com'})

  })
})