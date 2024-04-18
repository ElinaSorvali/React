import React, {useState } from 'react'
import './App.css'
import UserService from './services/User'
import md5 from 'md5'
import PasswordChecklist from "react-password-checklist"

const UserAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

    //Komponentin tilan määritys
    const [newFirstname, setNewFirstname] = useState('')
    const [newLastname, setNewLastname] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newAccesslevelId, setNewAccesslevelId] = useState('')
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState('')
    
    
    // onSubmit tapahtumankäsittelijä funktio
    const handleSubmit = (event) => {
          event.preventDefault()
          var newUser = {
            firstname: newFirstname,
            lastname: newLastname,
            email: newEmail,
            accesslevelId: parseInt(newAccesslevelId) || "2",
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
    <div>
    <h2>User add</h2>

    <form onSubmit={handleSubmit}  className='addNew'>
        <div><input type='text' value={newFirstname} onChange={({target}) => setNewFirstname(target.value)} placeholder='First name'/></div>
        <div><input type='text' value={newLastname} onChange={({target}) => setNewLastname(target.value)} placeholder='Last name' /></div>
        <div><input type='email' value={newEmail} onChange={({target}) => setNewEmail(target.value)} placeholder='Email' /></div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
  <p style={{ color: 'silver', marginRight: '10px' }}>Access level</p>
            <label>
                <input type='radio' value='1' checked={newAccesslevelId === '1'} onChange={() => setNewAccesslevelId('1')}/>
                1</label>
            <label>
                <input type='radio' value='2' checked={newAccesslevelId === '2'} onChange={() => setNewAccesslevelId('2')}/>
                2</label>
        </div>
        <div><input type='text' value={newUsername} onChange={({target}) => setNewUsername(target.value)} placeholder='Username' /></div>
        <div><input type='password' value={newPassword} onChange={({target}) => setNewPassword(target.value)} placeholder='Password' /></div>
        <div><input type='password' value={passwordAgain} onChange={({target}) => setPasswordAgain(target.value)} placeholder='Repeat password' /></div>
        {/* Tarkistaa että salasana on vähintään 5 merkkiä, siinä on isoja ja pieniä kirjaimia sekä että se on sama
        kuin alemmassa tarkistusboksissa */}
        <PasswordChecklist
				rules={["minLength","capital","match"]}
				minLength={5}
				value={newPassword}
				valueAgain={passwordAgain}
				onChange={(isValid) => {}}
        messages={{
					minLength: <span style={{ color: 'silver' }}>At least 5 characters</span>,
    capital: <span style={{ color: 'silver' }}>Use uppercase and lowercase letters</span>,
    match: <span style={{ color: 'silver' }}>Passwords must match</span>,
				}}
			/>
      <br></br>
        <p>
        <input type='submit' className='nappi' value='save' />
        <input type='button' className='nappi' value='back' onClick={() => setLisäystila(false)} /></p>

    </form>

    </div>
  )
}

export default UserAdd
