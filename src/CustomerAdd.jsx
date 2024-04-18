import React, {useState } from 'react'
import './App.css'
import CustomerService from './services/Customer'

const CustomerAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

    //Komponentin tilan määritys
    const [newCustomerId, setNewCustomerId] = useState('')
    const [newCompanyName, setNewCompanyName] = useState('')
    const [newContactName, setNewContactName] = useState('')
    const [newContactTitle, setNewContactTitle] = useState('')
    const [newCountry, setNewCountry] = useState('')
    const [newAddress, setNewAddress] = useState('')
    const [newCity, setNewCity] = useState('')
    const [newRegion, setNewRegion] = useState('')
    const [newPostalCode, setNewPostalCode] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newFax, setNewFax] = useState('')

    //onSubmit tapahtumakäsittelijän funktio
    const handleSubmit = (event) => {
        event.preventDefault()
        var newCustomer = {
            customerId: newCustomerId.toUpperCase(),
            companyName: newCompanyName,
            contactName: newContactName,
            contactTitle: newContactTitle,
            country: newCountry,
            address: newAddress,
            city: newCity,
            region: newRegion,
            postalCode: newPostalCode,
            phone: newPhone,
            fax: newFax
        }
        CustomerService.create(newCustomer)
        .then(response => {
            if (response.status === 200) {
                setMessage("Added new Customer: " +newCustomer.companyName)
                setIsPositive(true)
                setShowMessage(true)

                setTimeout(() => {
                    setShowMessage(false)
                }, 6000)

                setLisäystila(false)
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
    <div>
    <h2>Customer add</h2>

    <form on onSubmit={handleSubmit}  className='addNew'>
        <div><input type='text' value={newCustomerId} onChange={({target}) => setNewCustomerId(target.value)} placeholder='Customer ID'/></div>
        <div><input type='text' value={newCompanyName} onChange={({target}) => setNewCompanyName(target.value)} placeholder='Company Name' /></div>
        <div><input type='text' value={newContactName} onChange={({target}) => setNewContactName(target.value)} placeholder='Contact Name' /></div>
        <div><input type='text' value={newContactTitle} onChange={({target}) => setNewContactTitle(target.value)} placeholder='Contact Title' /></div>
        <div><input type='text' value={newAddress} onChange={({target}) => setNewAddress(target.value)} placeholder='Address' /></div>
        <div><input type='text' value={newCity} onChange={({target}) => setNewCity(target.value)} placeholder='City' /></div>
        <div><input type='text' value={newRegion} onChange={({target}) => setNewRegion(target.value)} placeholder='Region' /></div>
        <div><input type='text' value={newPostalCode} onChange={({target}) => setNewPostalCode(target.value)} placeholder='Postal code' /></div>
        <div><input type='text' value={newCountry} onChange={({target}) => setNewCountry(target.value)} placeholder='Country' /></div>
        <div><input type='text' value={newPhone} onChange={({target}) => setNewPhone(target.value)} placeholder='Phone' /></div>
        <div><input type='text' value={newFax} onChange={({target}) => setNewFax(target.value)} placeholder='Fax' /></div>
    <p>
        <input type='submit' className='nappi' value='save' />
        <input type='button' className='nappi' value='back' onClick={() => setLisäystila(false)} /></p>

    </form>

    </div>
  )
}

export default CustomerAdd
