import { Link } from "react-router-dom"

const BlogList = ({ blogs}) => {


    return (
        <>
          { blogs.length === 0 ? <p>Cargando blogs...</p>: 
            <div>
                <h2>Blogs</h2>
                <ul style= { { lineHeight: '1em' } }>
                    { blogs.sort((a,b) => b.likes-a.likes).map((blog) => 
                    <li key={blog.id}>
                        <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                    </li>) }
                </ul>
            </div>
          }
        </>
    )
}

export default BlogList