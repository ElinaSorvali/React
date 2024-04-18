import React, {useState} from 'react'
import './App.css'
import CustomerServices from './services/Customer'

//props on nimeltään customer
const Customer = ({customer, editCustomer, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

    //Komponentin tilan määritys
  const [showDetails, setShowDetails] = useState(false)

  const deleteCustomer = (customer) => {
    let vastaus = window.confirm(`Remove Customer ${customer.companyName}`)
    if (vastaus === true) {
    CustomerServices.remove(customer.customerId)
    .then(res => {
        if (res.status === 200) {
            setMessage(`Successfully removed customer ${customer.companyName}`)
            setIsPositive(true)
            setShowMessage(true)
            window.scrollBy(0, -10000)  //Ylösscrollaus

            //Ilmoituksen piilotus
            setTimeout(() => {
            setShowMessage(false)}, 
            5000
            )
        reloadNow(!reload)
        }
    })
    .catch(error => {
        setMessage(error)
        setIsPositive(false)
        setShowMessage(true)
        window.scrollBy(0, -10000)  //Ylösscrollaus

        setTimeout(() => {
            setShowMessage(false)
        }, 8000)
    })

  }
  else {
  setMessage(`Poisto peruttu ${customer.companyName}`)
            setIsPositive(true)
            setShowMessage(true)
            window.scrollBy(0, -10000)  //Ylösscrollaus

            setTimeout(() => {
            setShowMessage(false)}, 
            5000
            )
        }
}

//Returnissa on aina sivun html-asia
  return (
    <div className='customerDiv'>
        {/* Tämä <h4> näyttää tulokset kun hiiri viedään alaotsikon päälle */}
    {/* <h4 
  onMouseEnter={() => setShowDetails(true)}
  onMouseLeave={() => setShowDetails(false)}
> */}

{/* Tämä <h4> näyttää tulokset kun klikataan alaotsikkoa */}
<h4 onClick={() => setShowDetails(!showDetails)}>



  {customer.companyName}
</h4>

    {showDetails && <div className='customerDetails'>
        <h3>{customer.companyName}</h3>
        <p><button className='nappi1' onClick={() => deleteCustomer(customer)}>Delete</button>
        <button className='nappi1' onClick={() => editCustomer(customer)}>Edit</button></p>
        <table className='customerDetails'>
            <thead>
                <tr>
                    <th>Contact person</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Country</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{customer.contactName}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.address}</td>
                            <td>{customer.city}</td>
                            <td>{customer.country}</td>
                        </tr>
                        </tbody>
                        </table>
                        </div>}
    </div>
  )
}

export default Customer
