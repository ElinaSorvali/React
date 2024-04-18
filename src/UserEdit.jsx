import React, {useState } from 'react'
import './App.css'
import UserService from './services/User'
import PasswordChecklist from "react-password-checklist"

const UserEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaUser}) => {

    //Komponentin tilan määritys
    const [newUserId, setNewUserId] = useState(muokattavaUser.userId)
    const [newFirstName, setNewFirstName] = useState(muokattavaUser.firstName)
    const [newLastName, setNewLastName] = useState(muokattavaUser.lastName)
    const [newEmail, setNewEmail] = useState(muokattavaUser.email)
    const [newUserName, setNewUserName] = useState(muokattavaUser.userName)
    const [newPassword, setNewPassword] = useState(muokattavaUser.password || '')
    const [passwordAgain, setPasswordAgain] = useState('')
    const [newAccesslevelId, setNewAccesslevelId] = useState(muokattavaUser.accesslevelId)

    
    //onSubmit tapahtumakäsittelijän funktio
    const handleSubmit = (event) => {
        event.preventDefault()
        var newUser = {
            userId: newUserId,
            firstName: newFirstName,
            lastName: newLastName,
            email: newEmail,
            userName: newUserName,
            password: newPassword,
            accesslevelId: newAccesslevelId
        }
        UserService.update(newUser)
        .then(response => {
            if (response.status === 200) {
                setMessage("Edited User: " +newUser.lastName)
                setIsPositive(true)
                setShowMessage(true)

                setTimeout(() => {
                    setShowMessage(false)
                }, 6000)

                setMuokkaustila(false)
            }
        })
        .catch(error => {
            setMessage(error)
            setIsPositive(false)
            setShowMessage(true)

            setTimeout(() => {
                setShowMessage(false)
            }, 8000)
        })
    }


  return (
  //tämä viittaa tyyliluokkiin
    <div id="edit">
    <h2>User edit</h2>

    <form onSubmit={handleSubmit} className='edit'>
        <div>UserId<br></br><input type='text' value={newUserId} disabled /></div>
        <div>First Name<br></br><input type='text' value={newFirstName} onChange={({target}) => setNewFirstName(target.value)} placeholder='First Name' /></div>
        <div>Last Name<br></br><input type='text' value={newLastName} onChange={({target}) => setNewLastName(target.value)} placeholder='Last Name' /></div>
        <div>Email<br></br><input type='text' value={newEmail} onChange={({target}) => setNewEmail(target.value)} placeholder='Email' /></div>
        <div>User name<br></br><input type='text' value={newUserName} onChange={({target}) => setNewUserName(target.value)} placeholder='User name' /></div>
        <div>Accesslevel <br />
            <label>
                <input type='radio' value='1' checked={newAccesslevelId === '1'} onChange={() => setNewAccesslevelId('1')}/>
                1</label>
            <label>
                <input type='radio' value='2' checked={newAccesslevelId === '2'} onChange={() => setNewAccesslevelId('2')}/>
                2</label>
        </div>
        <div>Password<br></br><input type='password' value={newPassword} onChange={({target}) => setNewPassword(target.value)} placeholder='Password' /></div>
        <div><input type='password' value={passwordAgain} onChange={({target}) => setPasswordAgain(target.value)} placeholder='Repeat password' /></div>
        {/* Tarkistaa että salasana on vähintään 5 merkkiä, siinä on isoja ja pieniä kirjaimia sekä että se on sama
        kuin alemmassa tarkistusboksissa */}
        <PasswordChecklist
  rules={["minLength", "capital", "match"]}
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


        <p>
        <input type='submit' className='nappi' value='save' />
        <input type='button' className='nappi' value='back' onClick={() => setMuokkaustila(false)} /></p>

    </form>

    </div>
  )
}

export default UserEdit
