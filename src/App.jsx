import React, {useState} from 'react'
import './App.css'
import Laskuri from './Laskuri'
import Viesti from './Viesti'
import Posts from './Posts'
import CustomerList from './CustomerList'

const App = () => {
  
  //App komponentin tila
const [showLaskuri, setShowLaskuri] = useState(false)
const [showPosts, setShowPosts] = useState(false)

const huomio = () => {
  alert("Huomio!")
}
  return (
    <>
      <div>
        <h1>Hello</h1>

        <CustomerList />
        
        {showPosts && <button onClick={() =>setShowPosts(!showPosts)}>Piilota postaus</button>}
        {!showPosts && <button onClick={() =>setShowPosts(!showPosts)}>Näytä postaus</button>}
        {showPosts && <Posts />}
        
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
