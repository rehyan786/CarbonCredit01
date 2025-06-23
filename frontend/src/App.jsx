import React from 'react'
import Navbar from './components/Navbar/Navbar'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Coin from './pages/Coin/Coin'
import Solar from './pages/Solar/Solar'

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/coins/:coinId' element={<Coin/>}/> 
         <Route path='/solar' element={<Solar />} /> {/* 👈 route for solar */}
      </Routes>
       
    </div>
  )
}

export default App