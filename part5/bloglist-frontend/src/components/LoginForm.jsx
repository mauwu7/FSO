import { useState } from "react"

const LoginForm = ({ handleLogin }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')



    const submitForm = async (event) => {
        event.preventDefault()
        await handleLogin(username, password)
        setUsername('')
        setPassword('')

    }

    return(
        <>
        <form data-testid='form-login' onSubmit={ submitForm }>
          <h2>Login</h2>
          <p>
            <label>
              Username <input type='text' value={ username } onChange={ ( { target } ) => setUsername(target.value) }/>
            </label>
          </p>
          <p>
            <label>
              Password <input type='password' value={ password } onChange={ ( { target } ) => setPassword(target.value) }/>
            </label>
          </p>
          <button type='submit'>login</button>
        </form>
      </>
    )
}

export default LoginForm