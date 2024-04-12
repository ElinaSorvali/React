import React, {useState } from 'react'
import './App.css'
import CustomerService from './services/Customer'

const CustomerEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaCustomer}) => {

    //Komponentin tilan määritys
    const [newCustomerId, setNewCustomerId] = useState(muokattavaCustomer.customerId)
    const [newCompanyName, setNewCompanyName] = useState(muokattavaCustomer.companyName)
    const [newContactName, setNewContactName] = useState(muokattavaCustomer.contactName)
    const [newContactTitle, setNewContactTitle] = useState(muokattavaCustomer.contactTitle)
    const [newCountry, setNewCountry] = useState(muokattavaCustomer.country)
    const [newAddress, setNewAddress] = useState(muokattavaCustomer.address)
    const [newCity, setNewCity] = useState(muokattavaCustomer.city)
    const [newRegion, setNewRegion] = useState(muokattavaCustomer.region)
    const [newPostalCode, setNewPostalCode] = useState(muokattavaCustomer.postalCode)
    const [newPhone, setNewPhone] = useState(muokattavaCustomer.phone)
    const [newFax, setNewFax] = useState(muokattavaCustomer.fax)

    //onSubmit tapahtumakäsittelijän funktio
    const handleSubmit = (event) => {
        event.preventDefault()
        var newCustomer = {
            customerId: newCustomerId,
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
        CustomerService.update(newCustomer)
        .then(response => {
            if (response.status === 200) {
                setMessage("Edited Customer: " +newCustomer.companyName)
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
    <h2>Customer edit</h2>

    <form onSubmit={handleSubmit}>
        <div><input type='text' value={newCustomerId} disabled /></div>
        <div>Company Name<br></br><input type='text' value={newCompanyName} onChange={({target}) => setNewCompanyName(target.value)} placeholder='Company Name' /></div>
        <div>Contact Name<br></br><input type='text' value={newContactName} onChange={({target}) => setNewContactName(target.value)} placeholder='Contact Name' /></div>
        <div>Contact Title<br></br><input type='text' value={newContactTitle} onChange={({target}) => setNewContactTitle(target.value)} placeholder='Contact Title' /></div>
        <div>Address<br></br><input type='text' value={newAddress} onChange={({target}) => setNewAddress(target.value)} placeholder='Address' /></div>
        <div>City<br></br><input type='text' value={newCity} onChange={({target}) => setNewCity(target.value)} placeholder='City' /></div>
        <div>Region<br></br><input type='text' value={newRegion} onChange={({target}) => setNewRegion(target.value)} placeholder='Region' /></div>
        <div>Postal code<br></br><input type='text' value={newPostalCode} onChange={({target}) => setNewPostalCode(target.value)} placeholder='Postal code' /></div>
        <div>Country<br></br><input type='text' value={newCountry} onChange={({target}) => setNewCountry(target.value)} placeholder='Country' /></div>
        <div>Phone<br></br><input type='text' value={newPhone} onChange={({target}) => setNewPhone(target.value)} placeholder='Phone' /></div>
        <div>Fax<br></br><input type='text' value={newFax} onChange={({target}) => setNewFax(target.value)} placeholder='Fax' /></div>
<p>
        <input type='submit' className='nappi' value='save' />
        <input type='button' className='nappi' value='back' onClick={() => setMuokkaustila(false)} /></p>

    </form>

    </div>
  )
}

export default CustomerEdit
