import React, {useState} from 'react'
import './App.css'
import Laskuri from './Laskuri'
import Viesti from './Viesti'
import Posts from './Posts'

const App = () => {
  
  //App komponentin tila
const [showLaskuri, setShowLaskuri] = useState(false)

const huomio = () => {
  alert("Huomio!")
}
  return (
    <>
      <div>
        <h1>Hello</h1>

        <Posts />
        
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
