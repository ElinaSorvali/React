import React, {useState, useEffect } from 'react'
import './App.css'
import UserService from './services/User'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'

const UserList = ({setIsPositive, setShowMessage, setMessage}) => {

    //Komponentin tilan määritys
  const [users, setUsers] = useState([])
  const [lisäystila, setLisäystila] = useState(false)
  const [muokkaustila, setMuokkaustila] = useState(false)
  const [reload, reloadNow] = useState(false)
  const [muokattavaUser, setMuokattavaUser] = useState(false)
  const [search, setSearch] = useState("")

  
  useEffect(() => {
    //token-hommeli, että kirjautumishommeli toimii
    const token = localStorage.getItem('token')
      UserService
        .setToken(token)
        //loppuu
    UserService.getAll()
    .then(data => {
        setUsers(data)
    })
  },[lisäystila, reload, muokkaustila]
  )

  //Hakukentän onChange tapahtumankäsittelijä
  const handleSearchInputChange = (event) => {
    setSearch(event.target.value.toLowerCase())
  }

  const editUser = (user) => {
    setMuokattavaUser(user)
    setMuokkaustila(true)
  }

  const deleteUser = (user) => {
    let vastaus = window.confirm(`Remove User ${user.userId}`);
    if (vastaus === true) {
      UserService.remove(user.userId)
        .then(res => {
          if (res.status === 200) {
            setMessage(`Successfully removed user ${user.userId}`);
            setIsPositive(true);
            setShowMessage(true);
            window.scrollBy(0, -10000);  //Ylösscrollaus
  
            //Ilmoituksen piilotus
            setTimeout(() => {
              setShowMessage(false);
            }, 5000);
            reloadNow(!reload);
          }
        })
        .catch(error => {
          setMessage(error.message);
          setIsPositive(false);
          setShowMessage(true);
          window.scrollBy(0, -10000);  //Ylösscrollaus
  
          setTimeout(() => {
            setShowMessage(false);
          }, 8000);
        });
    } else {
      setMessage(`Poisto peruttu ${user.lastName}`);
      setIsPositive(true);
      setShowMessage(true);
      window.scrollBy(0, -10000);  //Ylösscrollaus
  
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }
  }  

  //onko käyttäjän accesslevelId tallennettu ja onko se 1
  if (localStorage.getItem('accesslevelId') !== '1') {
    return null;
  }

  return (
    <>
    <h1><nobr> Users </nobr> 

    {lisäystila && 
    <UserAdd setLisäystila={setLisäystila} setIsPositive={setIsPositive} setShowMessage={setShowMessage} setMessage={setMessage} />}

    
    {/* Jos lisäystila on false, näkyy lisää-nappi */}
    {!lisäystila &&<button className='nappi' onClick={() => setLisäystila(true)}>Add new</button>}</h1>

    {!lisäystila && !muokkaustila &&
    <input placeholder='Search by last name' value={search} onChange={handleSearchInputChange} />
    }
{!lisäystila && !muokkaustila && (
<table id="userTable">
    <thead>
        <tr>
        <th>Firstname </th>
        <th>Lastname</th>
        <th>Email</th>
        <th>Accesslevel</th>
        <th></th>
        <th></th>
        </tr>
    </thead>
    <tbody>
    {users && users.map((u) => 
    {
        const lowerCaseName = u.lastName.toLowerCase()
        if (lowerCaseName.indexOf(search) > -1) {
            return(
                <tr key={u.userId}>
                    <td>{u.firstName}</td>
                    <td>{u.lastName}</td>
                    <td>{u.email}</td>
                    <td>{u.accesslevelId}</td>
                    <td><button className='nappi1' onClick={() => deleteUser(u)}>Delete</button></td>
                    <td><button className='nappi1' onClick={() => editUser(u)}>Edit</button></td>
                </tr>

        )}
    }
        )
    }
        </tbody>
</table>
)}
{muokkaustila && (
        <UserEdit setMuokkaustila={setMuokkaustila} setIsPositive={setIsPositive} setShowMessage={setShowMessage}
          setMessage={setMessage} muokattavaUser={muokattavaUser}
        />
      )}
    </>
  )
}

export default UserList
