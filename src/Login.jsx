import React, {useState } from 'react'
import './App.css'
import LoginService from './services/Auth'
import md5 from 'md5'

const Login = ({setIsPositive, setMessage, setShowMessage, setLoggedInUser}) => {

    //Komponentin tilan määritys
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    
    // onSubmit tapahtumankäsittelijä funktio
    const handleSubmit = (event) => {
          event.preventDefault()
          var userForAuth = {
            username: username,
            password: md5(password) // Salataan md5 kirjaston metodilla
        }
        
        //console.log(userForAuth)
    
        LoginService.authenticate(userForAuth)
        .then(response => {
          if (response.status === 200) {

            //talletetaan tiedot local storageen
            localStorage.setItem("username", response.data.username)
            localStorage.setItem("accesslevelId", response.data.accesslevelId)
            localStorage.setItem("token", response.data.token)

            setLoggedInUser(response.data.username)

           setMessage(`Logged in as: ${userForAuth.username}`)
           setIsPositive(true)
           setShowMessage(true)
          
           setTimeout(() => {
            setShowMessage(false)
           }, 5000)
        }
    
          })
          .catch(error => {
            setMessage(error.message)
            setIsPositive(false)
            setShowMessage(true)
    
            setTimeout(() => {
              setShowMessage(false)
             }, 6000)
          })
        }
    
    const emptyFields = () => {
        setUsername("")
        setPassword("")
    }

  return (
    <div id="loginWindow">
    <h2>Login</h2>

    <form onSubmit={handleSubmit}>
        <div><input type='text' value={username} onChange={({target}) => setUsername(target.value)} placeholder='Username' /></div>
        <div><input type='password' value={password} onChange={({target}) => setPassword(target.value)} placeholder='Password' /></div>
        <p>
        <input type='submit' className='nappi' value='Login' />
        <input type='button' className='nappi' value='Empty' onClick={() => emptyFields()} /></p>

    </form>

    </div>
  )
}

export default Login
