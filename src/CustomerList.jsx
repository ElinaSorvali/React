import React, {useState, useEffect } from 'react'
import './App.css'
import CustomerService from './services/Customer'
import Customer from './Customer'
import CustomerAdd from './CustomerAdd'
import CustomerEdit from './CustomerEdit'

const CustomerList = ({setIsPositive, setShowMessage, setMessage}) => {

    //Komponentin tilan määritys
  const [customers, setCustomers] = useState([])
  const [showCustomers, setShowCustomers] = useState(false)
  const [lisäystila, setLisäystila] = useState(false)
  const [muokkaustila, setMuokkaustila] = useState(false)
  const [reload, reloadNow] = useState(false)
  const [muokattavaCustomer, setMuokattavaCustomer] = useState(false)


  useEffect(() => {
    CustomerService.getAll()
    .then(data => {
        setCustomers(data)
    })
  },[lisäystila, reload, muokkaustila]
  )

  const editCustomer = (customer) => {
    setMuokattavaCustomer(customer)
    setMuokkaustila(true)
  }

  return (
    <>
    <h1><nobr style={{cursor: 'pointer'}}
    onClick={() => setShowCustomers(!showCustomers)}> Customers </nobr> 
    
    {/* Jos lisäystila on false, näkyy lisää-nappi */}
    {!lisäystila &&<button className='nappi' onClick={() => setLisäystila(true)}>Add new</button>}</h1>

    {/* Jos lisäystila on true, käytetään customeradd-komponenttia */}
    {lisäystila && <CustomerAdd setLisäystila={setLisäystila}
    setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}

    {muokkaustila && <CustomerEdit setMuokkaustila={setMuokkaustila}
    setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} 
    muokattavaCustomer={muokattavaCustomer}
    />}

    {
        showCustomers && customers && customers.map(c => (
            <Customer key={c.customerId} customer={c} reloadNow={reloadNow} reload={reload}
            setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
            editCustomer={editCustomer}
            />
        )
        )
    }

    
    </>
  )
}

export default CustomerList
