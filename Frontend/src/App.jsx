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
import Admindash from './Components/AdminDASH/Admindash.jsx'
import Addflight from './Components/AdminDASH/Addflight.jsx'
import Bulkupdate from './Components/AdminDASH/Bulkupdate.jsx'
import Flightedit from './Components/AdminDASH/Flightedit.jsx'
import Addshuttle from './Components/AdminDASH/Addshuttle.jsx'
import Shuttleedit from './Components/AdminDASH/Shuttleedit.jsx'

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
        <Route path='/adminlog/admin/:id' element={<Admindash/>}/>
        <Route path='/adminlog/admin/:id/addflight' element={<Addflight/>}/>
        <Route path='/adminlog/admin/:id/bulkflight' element={<Bulkupdate/>}/>
        <Route path='/adminlog/admin/flightedit/:id/:sf' element={<Flightedit/>}/>
        <Route path='/adminlog/admin/addshuttle/:id' element={<Addshuttle/>}/>
        <Route path='/adminlog/admin/updateshuttle/:type/:id' element={<Shuttleedit/>}/>
        
    </Routes>
        
    </>
  )
}

export default App
