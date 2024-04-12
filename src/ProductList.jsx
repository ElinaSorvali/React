import React, {useState, useEffect } from 'react'
import './App.css'
import ProductService from './services/Product'
import ProductAdd from './ProductAdd'
import ProductEdit from './ProductEdit'

const ProductList = ({setIsPositive, setShowMessage, setMessage}) => {

    //Komponentin tilan määritys
  const [products, setProducts] = useState([])
  const [lisäystila, setLisäystila] = useState(false)
  const [muokkaustila, setMuokkaustila] = useState(false)
  const [reload, reloadNow] = useState(false)
  const [muokattavaProduct, setMuokattavaProduct] = useState(false)
  const [search, setSearch] = useState("")


  useEffect(() => {
    ProductService.getAll()
    .then(data => {
        setProducts(data)
    })
  },[lisäystila, reload, muokkaustila]
  )

  //Hakukentän onChange tapahtumankäsittelijä
  const handleSearchInputChange = (event) => {
    setSearch(event.target.value.toLowerCase())
  }

  const editProduct = (product) => {
    setMuokattavaProduct(product)
    setMuokkaustila(true)
  }

  const deleteProduct = (product) => {
    let vastaus = window.confirm(`Remove product ${product.productName}`);
    if (vastaus === true) {
        ProductService.remove(product.productId)
        .then(res => {
          if (res.status === 200) {
            setMessage(`Successfully removed product ${product.productName}`);
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
      setMessage(`Poisto peruttu ${product.productName}`);
      setIsPositive(true);
      setShowMessage(true);
      window.scrollBy(0, -10000);  //Ylösscrollaus
  
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }
  }  

  return (
    <>
    <h1><nobr> Products </nobr> 

    {lisäystila && 
    <ProductAdd setLisäystila={setLisäystila} setIsPositive={setIsPositive} setShowMessage={setShowMessage} setMessage={setMessage} />}

    
    {/* Jos lisäystila on false, näkyy lisää-nappi */}
    {!lisäystila &&<button className='nappi' onClick={() => setLisäystila(true)}>Add new</button>}</h1>

    {!lisäystila && !muokkaustila &&
    <input placeholder='Search by product name' value={search} onChange={handleSearchInputChange} />
    }
{!lisäystila && !muokkaustila && (
<table id="userTable">
    <thead>
        <tr>
        <th>Product name </th>
        <th>Quantity per unit</th>
        <th>Unit price</th>
        <th></th>
        <th></th>
        </tr>
    </thead>
    <tbody>
    {products && products.map((p) => 
    {
        const lowerCaseName = p.productName.toLowerCase()
        if (lowerCaseName.indexOf(search) > -1) {
            return(
                <tr key={p.productId}>
                    <td>{p.productName}</td>
                    <td>{p.quantityPerUnit}</td>
                    <td>{p.unitPrice}</td>
                    <td><button className='nappi1' onClick={() => deleteProduct(p)}>Delete</button></td>
                    <td><button className='nappi1' onClick={() => editProduct(p)}>Edit</button></td>
                </tr>

        )}
    }
        )
    }
        </tbody>
</table>
)}
{muokkaustila && (
        <ProductEdit setMuokkaustila={setMuokkaustila} setIsPositive={setIsPositive} setShowMessage={setShowMessage}
          setMessage={setMessage} muokattavaProduct={muokattavaProduct}
        />
      )}
    </>
  )
}

export default ProductList
