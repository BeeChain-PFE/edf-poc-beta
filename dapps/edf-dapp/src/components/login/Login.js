import React, { useState } from 'react'
import { Button, FormGroup, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './Login.css'



  
const Login = () => {
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')

const handleSubmit =()=>{

}

const validateForm =()=>{

}
    return (
        <div className='Login'>
        <div className='Form'>
          <h1 className='Title'>Holder Login</h1>
          <p className='Info'>
            Login in order to continue
          </p>
          <form onSubmit={handleSubmit}>
            <FormGroup controlId='username' >
              {/* <ControlLabel className='Label'>Username</ControlLabel> */}
              <FormControl
                autoFocus
                className='Input'
                type='text'
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId='password' >
              {/* <ControlLabel className='Label'>Password</ControlLabel> */}
              <FormControl
                className='Input'
                type='password'
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </FormGroup>
            {/* <Link className='Link' to='/reset-password'>Forgot password?</Link> */}
            <Button className='Button' disabled={!validateForm()} type='submit'>
              Login
            </Button>
          </form>
        </div>
      </div>
    )
  }
  
  export default Login
  

