import { TextField, Button } from "@mui/material"
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
         <h2>Login</h2>
        <form data-testid='form-login' onSubmit={ submitForm }>
          <div >
            <TextField label="Username" value={ username } onChange={ event => setUsername(event.target.value)}/>
          </div>
          <div style={{ marginTop: 10}} >
            <TextField label="Password" value={ password } onChange={ event => setPassword(event.target.value)}/>
          </div>
          <Button type="submit" variant="contained" style={ { marginTop: 10  } }>Save</Button>
        </form>
      </>
    )
}

export default LoginForm