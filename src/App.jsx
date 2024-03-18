import React, {useState} from 'react'
import './App.css'
import Laskuri from './Laskuri'
import Viesti from './Viesti'

const App = () => {
  
  //App komponentin tila
const [showLaskuri, setShowLaskuri] = useState(false)

const huomio = () => {
  alert("Huomio!")
}


  return (
    <>
      <div>
        <h1>Testiä</h1>
        
        {/* Jos Laskuri on true, näkyy */}
        {showLaskuri && <Laskuri huomio={huomio} />}
        {showLaskuri && <button onClick={() =>setShowLaskuri(!showLaskuri)}>Piilota laskuri</button>}
        {!showLaskuri && <button onClick={() =>setShowLaskuri(!showLaskuri)}>Näytä laskuri</button>}


        <Viesti teksti="tervehdys app-komponentista" />
      </div>
     
    </>
  )
}

export default App
