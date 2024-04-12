import React, { useState } from 'react'
import './App.css'
import ProductService from './services/Product'

const ProductEdit = ({ setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaProduct }) => {

    // Komponentin tilan määritys
    const [newProductId, setNewProductId] = useState(muokattavaProduct.productId)
    const [newProductName, setNewProductName] = useState(muokattavaProduct.productName)
    const [newSupplierId, setNewSupplierId] = useState(muokattavaProduct.supplierId)
    const [newCategoryId, setNewCategoryId] = useState(muokattavaProduct.categoryId)
    const [newQuantityPerUnit, setNewQuantityPerUnit] = useState(muokattavaProduct.quantityPerUnit)
    const [newUnitPrice, setNewUnitPrice] = useState(muokattavaProduct.unitPrice ?? '')
    const [newUnitsInStock, setNewUnitsInStock] = useState(muokattavaProduct.unitsInStock ?? '')
    const [newUnitsOnOrder, setNewUnitsOnOrder] = useState(muokattavaProduct.unitsOnOrder ?? '')
    const [newReorderLevel, setNewReorderLevel] = useState(muokattavaProduct.reorderLevel ?? '')
    const [newDiscontinued, setNewDiscontinued] = useState(muokattavaProduct.discontinued)
    const [newImageLink, setNewImageLink] = useState(muokattavaProduct.imageLink)

    // onSubmit tapahtumakäsittelijän funktio
    const handleSubmit = (event) => {
        event.preventDefault()

        var newProduct = {
            productId: newProductId,
            productName: newProductName,
            supplierId: parseInt(newSupplierId),
            categoryId: parseInt(newCategoryId),
            quantityPerUnit: newQuantityPerUnit,
            unitPrice: newUnitPrice,
            unitsInStock: newUnitsInStock,
            unitsOnOrder: newUnitsOnOrder,
            reorderLevel: newReorderLevel,
            discontinued: newDiscontinued,
            imageLink: newImageLink,
        };

        ProductService.update(newProduct)
            .then(response => {
                if (response.status === 200) {
                    setMessage("Edited Product: " + newProduct.productName)
                    setIsPositive(true)
                    setShowMessage(true)

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 6000);

                    setMuokkaustila(false)
                }
            })
            .catch(error => {
                setMessage(error.message)
                setIsPositive(false)
                setShowMessage(true)

                setTimeout(() => {
                    setShowMessage(false)
                }, 8000)
            })
    };

    return (
        // Tämä viittaa tyyliluokkiin
        <div id="edit">
            <h2>Product edit</h2>

            <form onSubmit={handleSubmit}>
                <div>ProductId<br /><input type='text' value={newProductId} disabled /></div>
                <div>Product Name<br /><input type='text' value={newProductName} onChange={({ target }) => setNewProductName(target.value)} placeholder='Product name' /></div>
                <div>Supplier Id<br /><input type='number' value={newSupplierId} onChange={({ target }) => setNewSupplierId(target.value)} placeholder='Supplier id' /></div>
                <div>Category Id<br /><input type='number' value={newCategoryId} onChange={({ target }) => setNewCategoryId(target.value)} placeholder='Category id' /></div>
                <div>Quantity per unit<br /><input type='text' value={newQuantityPerUnit} onChange={({ target }) => setNewQuantityPerUnit(target.value)} placeholder='Quantity per unit' /></div>
                <div>Unit price<br /><input type='number' value={newUnitPrice} onChange={({ target }) => setNewUnitPrice(target.value)} placeholder='Unit price' /></div>
                <div>Units in stock<br /><input type='number' value={newUnitsInStock} onChange={({ target }) => setNewUnitsInStock(target.value)} placeholder='Units in stock' /></div>
                <div>Units on order<br /><input type='number' value={newUnitsOnOrder} onChange={({ target }) => setNewUnitsOnOrder(target.value)} placeholder='Units on order' /></div>
                <div>Re-order level<br /><input type='number' value={newReorderLevel} onChange={({ target }) => setNewReorderLevel(target.value)} placeholder='Re-order level' /></div>
                <div>Discontinued<br />
                    <label>
                        <input type='radio' value={true} checked={newDiscontinued === true} onChange={() => setNewDiscontinued(true)} />
                        True
                    </label>
                    <label>
                        <input type='radio' value={false} checked={newDiscontinued === false} onChange={() => setNewDiscontinued(false)} />
                        False
                    </label>
                </div>
                <div>Image link<br /><input type='text' value={newImageLink} onChange={({ target }) => setNewImageLink(target.value)} placeholder='Imagelink' /></div>
                <p>
                    <input type='submit' className='nappi' value='save' />
                    <input type='button' className='nappi' value='back' onClick={() => setMuokkaustila(false)} />
                </p>
            </form>
        </div>
    );
};

export default ProductEdit
