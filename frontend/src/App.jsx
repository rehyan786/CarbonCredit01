import React from 'react'
import Navbar from './components/Navbar/Navbar'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import AboutUs from './components/About-us'
//import Coin from './pages/Coin/Coin'
import Solar from './pages/Solar/Solar'
import CarbonNews from './components/news/CarbonNews';
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Routes>
         <Route path='/' element={<Home/>}/>
         {/* <Route path='/coins/:coinId' element={<Coin/>}/>  */}
         <Route path='/solar' element={<Solar />} /> {/* 👈 route for solar */}
          <Route path='/news' element={<CarbonNews />} />
      </Routes>
      <AboutUs />
      <Footer />
       
    </div>
  )
}

export default App