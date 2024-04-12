import React, {useState } from 'react'
import './App.css'
import ProductService from './services/Product'


const ProductAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

    //Komponentin tilan määritys
    const [newProductname, setNewProductname] = useState('')
    const [newSupplierid, setNewSupplierid] = useState('')
    const [newCategoryid, setNewCategoryid] = useState('')
    const [newQuantityperunit, setNewQuantityperunit] = useState('')
    const [newUnitprice, setNewUnitprice] = useState('' || "0")
    const [newUnitsinstock, setNewUnitsinstock] = useState('' || "0")
    const [newUnitsonorder, setNewUnitsonorder] = useState('' || "0")
    const [newReorderlevel, setNewReorderlevel] = useState('' || "0")
    const [newDiscontinued, setNewDiscontinued] = useState(false)
    const [newImagelink, setNewImagelink] = useState('')
    
    // onSubmit tapahtumankäsittelijä funktio
    const handleSubmit = (event) => {
          event.preventDefault()
          var newProduct = {
            productname: newProductname,
            supplierid: parseInt(newSupplierid),
            categoryid: parseInt(newCategoryid),
            quantityperunit: newQuantityperunit,
            unitprice: newUnitprice,
            unitsinstock: newUnitsinstock,
            unitsonorder: newUnitsonorder,
            reorderlevel: newReorderlevel,
            discontinued: newDiscontinued,
            imagelink: newImagelink,
        }
        
        console.log(newProduct)
    
        ProductService.create(newProduct)
        .then(response => {
          if (response.status === 200) {
           setMessage(`Added new User: ${newProduct.productname}`)
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
    <h2>Product add</h2>

    <form onSubmit={handleSubmit}>
        <div><input type='text' value={newProductname} onChange={({target}) => setNewProductname(target.value)} placeholder='Product name'/></div>
        <div><input type='number' value={newSupplierid} onChange={({target}) => setNewSupplierid(target.value)} placeholder='Supplier id' /></div>
        <div><input type='number' value={newCategoryid} onChange={({target}) => setNewCategoryid(target.value)} placeholder='Category id' /></div>
        <div><input type='text' value={newQuantityperunit} onChange={({target}) => setNewQuantityperunit(target.value)} placeholder='Quantity per unit' /></div>
        <div><input type='number' value={newUnitprice} onChange={({target}) => setNewUnitprice(target.value)} placeholder='Unit price' /></div>
        <div><input type='number' value={newUnitsinstock} onChange={({target}) => setNewUnitsinstock(target.value)} placeholder='Units in stock' /></div>
        <div><input type='number' value={newUnitsonorder} onChange={({target}) => setNewUnitsonorder(target.value)} placeholder='Units on order'/></div>
        <div><input type='number' value={newReorderlevel} onChange={({target}) => setNewReorderlevel(target.value)} placeholder='Re-order level' /></div>
        <div><input type='text' value={newDiscontinued} onChange={({target}) => setNewDiscontinued(target.value)} placeholder='Discontinued' /></div>
        <div><input type='text' value={newImagelink} onChange={({target}) => setNewImagelink(target.value)} placeholder='Imagelink' /></div>
        <p>
        <input type='submit' className='nappi' value='save' />
        <input type='button' className='nappi' value='back' onClick={() => setLisäystila(false)} /></p>

    </form>

    </div>
  )
}

export default ProductAdd
