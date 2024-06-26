import React, {useState, useEffect} from 'react'
import './App.css'
import Laskuri from './Laskuri'
import Posts from './Posts'
import CustomerList from './CustomerList'
import UserList from './UserList'
import Message from './Message'
import ProductList from './ProductList'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Login'


const App = () => {
  
  //App komponentin tila

//Statet messagen näyttämistä varten
const [showMessage, setShowMessage] = useState(false)
const [message, setMessage] = useState('')
const [isPositive, setIsPositive] = useState(false)
const [loggedInUser, setLoggedInUser] = useState('')

//Pitää kirjautuneena sisään vaikka päivittäisi yms hyödyntämällä localstoragea
useEffect(() => {
  let storedUser = localStorage.getItem("username")
  if (storedUser !== null) {
    setLoggedInUser(storedUser)
  }
},[])

const logout = () => {
  localStorage.clear()
  setLoggedInUser('')
}

  return (

   <div className='App'>
{!loggedInUser && <Login setMessage={setMessage} setIsPositive={setIsPositive} 
setShowMessage={setShowMessage} setLoggedInUser={setLoggedInUser} />}
{loggedInUser &&    
  <Router>
    <Navbar id="navi" expand="lg" bg="dark" variant="dark">
      <Nav className="mr-auto">
        <Nav.Link href='/customers'>Customers</Nav.Link>
        <Nav.Link href='/posts'>Some higlights</Nav.Link>
        {localStorage.getItem("accesslevelId") === "1" && <Nav.Link href='/users'>Users</Nav.Link>}
        <Nav.Link href='/products'>Products</Nav.Link>
        <Nav.Link href='/laskuri'>Laskuri</Nav.Link>
        <button className='nappi2' onClick={() => logout()}>Logout</button>
      </Nav>
    </Navbar>
                    
    <h1>Northwind Corporation</h1>

    {showMessage && <Message message={message} isPositive={isPositive} />}

    <Routes id="routes">
      <Route path="/customers" element={<CustomerList setMessage={setMessage} setIsPositive={setIsPositive} setShowMessage={setShowMessage} />} />
      <Route path="/users" element={<UserList setMessage={setMessage} setIsPositive={setIsPositive} setShowMessage={setShowMessage} />} />
      <Route path="/products" element={<ProductList setMessage={setMessage} setIsPositive={setIsPositive} setShowMessage={setShowMessage} />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/laskuri" element={<Laskuri />} />
    </Routes>
  </Router>
}

      </div>
     

  )
}

export default App
