import { useState } from 'react'
import React from 'react'
import './App.css'

const Laskuri = (props) => {

    //Komponentin tilan määritys
  const [luku, setLuku] = useState(0)

  return (
    <>
    <h3>{luku}</h3>
     <button onClick={() => setLuku(luku+1)}>+</button>
     <button onClick={() => setLuku(resizeTo=0)}>reset</button>
     <button onClick={() => setLuku(luku-1)}>-</button>
     <button onClick={props.huomio}>Huomio</button>

    </>
  )
}

export default Laskuri
