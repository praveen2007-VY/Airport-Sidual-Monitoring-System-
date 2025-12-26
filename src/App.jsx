import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Firstpage from './Components/Firstpage'
import Adminlog from './Components/Adminlog/Adminlog'
import Adminforget from './Components/Adminlog/Adminforget'
import { Route ,Routes } from 'react-router-dom'
import Stafflog from './Components/stafflog/Stafflog'
import Passenger from './Components/Passenger/Passenger'
import Passlogin from './Components/Passenger/Passlogin'
import Passforget from './Components/Passenger/Passforget.jsx'

function App() {
  
  return (
   <>
    <Routes>
       
        <Route path='/' element={<Firstpage/>}/>
        <Route path='/adminlog' element={<Adminlog/>}/>
        <Route path='/adminforget' element={<Adminforget/>}/>
        <Route path='/stafflog' element={<Stafflog/>}/>
        <Route path='/passenger' element={<Passenger/>}/>
        <Route path='/passenger/login' element={<Passlogin/>}/>
        <Route path='/passenger/login/forgot' element={<Passforget/>}/>
    </Routes>
    
    </>
  )
}

export default App
