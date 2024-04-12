import React, {useState } from 'react'
import './App.css'
import UserService from './services/User'

const UserEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaUser}) => {

    //Komponentin tilan määritys
    const [newUserId, setNewUserId] = useState(muokattavaUser.userId)
    const [newFirstName, setNewFirstName] = useState(muokattavaUser.firstName)
    const [newLastName, setNewLastName] = useState(muokattavaUser.lastName)
    const [newEmail, setNewEmail] = useState(muokattavaUser.email)
    const [newUserName, setNewUserName] = useState(muokattavaUser.userName)
    const [newPassword, setNewPassword] = useState(muokattavaUser.password || '')
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

    <form onSubmit={handleSubmit}>
        <div>UserId<br></br><input type='text' value={newUserId} disabled /></div>
        <div>First Name<br></br><input type='text' value={newFirstName} onChange={({target}) => setNewFirstName(target.value)} placeholder='First Name' /></div>
        <div>Last Name<br></br><input type='text' value={newLastName} onChange={({target}) => setNewLastName(target.value)} placeholder='Last Name' /></div>
        <div>Email<br></br><input type='text' value={newEmail} onChange={({target}) => setNewEmail(target.value)} placeholder='Email' /></div>
        <div>User name<br></br><input type='text' value={newUserName} onChange={({target}) => setNewUserName(target.value)} placeholder='User name' /></div>
        <div>Password<br></br><input type='password' value={newPassword} onChange={({target}) => setNewPassword(target.value)} placeholder='Password' /></div>
        <div>Accesslevel Id<br></br><input type='text' value={newAccesslevelId} disabled /></div>
        <p>
        <input type='submit' className='nappi' value='save' />
        <input type='button' className='nappi' value='back' onClick={() => setMuokkaustila(false)} /></p>

    </form>

    </div>
  )
}

export default UserEdit
