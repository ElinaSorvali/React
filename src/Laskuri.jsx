import { useState } from 'react'
import React from 'react'
import './App.css'

const Laskuri = ({huomio}) => {

    //Komponentin tilan määritys
  const [luku, setLuku] = useState(0)

  return (
    <>
    <h3>{luku}</h3>
     <button onClick={() => setLuku(luku+1)}>+</button>
     <button onClick={() => setLuku(0)}>reset</button>
     <button onClick={() => setLuku(luku-1)}>-</button>
     <button onClick={huomio}>Huomio</button>

    </>
  )
}

export default Laskuri
