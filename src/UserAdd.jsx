import React, {useState } from 'react'
import './App.css'
import UserService from './services/User'
import md5 from 'md5'

const UserAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

    //Komponentin tilan määritys
    const [newFirstname, setNewFirstname] = useState('')
    const [newLastname, setNewLastname] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newAccesslevelId, setNewAccesslevelId] = useState(2)
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    
    
    // onSubmit tapahtumankäsittelijä funktio
    const handleSubmit = (event) => {
          event.preventDefault()
          var newUser = {
            firstname: newFirstname,
            lastname: newLastname,
            email: newEmail,
            accesslevelId: parseInt(newAccesslevelId),
            username: newUsername,
            password: md5(newPassword) // Salataan md5 kirjaston metodilla
        }
        
        console.log(newUser)
    
        UserService.create(newUser)
        .then(response => {
          if (response.status === 200) {
           setMessage(`Added new User: ${newUser.firstname} ${newUser.lastname}`)
           setIsPositive(true)
           setShowMessage(true)
          
           setTimeout(() => {
            setShowMessage(false)
           }, 5000)
    
           setLisäystila(false)
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
    
    

  return (
    <div id="addNew">
    <h2>User add</h2>

    <form onSubmit={handleSubmit}>
        <div><input type='text' value={newFirstname} onChange={({target}) => setNewFirstname(target.value)} placeholder='First name'/></div>
        <div><input type='text' value={newLastname} onChange={({target}) => setNewLastname(target.value)} placeholder='Last name' /></div>
        <div><input type='email' value={newEmail} onChange={({target}) => setNewEmail(target.value)} placeholder='Email' /></div>
        <div><input type='number' value={newAccesslevelId} onChange={({target}) => setNewAccesslevelId(target.value)} placeholder='Access level' /></div>
        <div><input type='text' value={newUsername} onChange={({target}) => setNewUsername(target.value)} placeholder='Username' /></div>
        <div><input type='password' value={newPassword} onChange={({target}) => setNewPassword(target.value)} placeholder='Password' /></div>
        <p>
        <input type='submit' className='nappi' value='save' />
        <input type='button' className='nappi' value='back' onClick={() => setLisäystila(false)} /></p>

    </form>

    </div>
  )
}

export default UserAdd
