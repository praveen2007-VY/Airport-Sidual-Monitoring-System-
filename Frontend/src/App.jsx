import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Firstpage from './Components/Firstpage'
import Adminlog from './Components/Adminlog/Adminlog'
import Adminforget from './Components/Adminlog/Adminforget'
import { Route ,Routes } from 'react-router-dom'
import Stafflog from './Components/stafflog/Stafflog'
import Passlogin from './Components/Passenger/Passlogin'
import Passforget from './Components/Passenger/Passforget.jsx'
import Admindash from './Components/AdminDASH/Admindash.jsx'
import Addflight from './Components/AdminDASH/Addflight.jsx'
import Bulkupdate from './Components/AdminDASH/Bulkupdate.jsx'
import Flightedit from './Components/AdminDASH/Flightedit.jsx'
import Addshuttle from './Components/AdminDASH/Addshuttle.jsx'
import Shuttleedit from './Components/AdminDASH/Shuttleedit.jsx'
import Staffreg from './Components/AdminDASH/Staffreg.jsx'
import Staffdash from './Components/stafflog/Staffdash.jsx'
import { toast, ToastContainer } from 'react-toastify'
import PassengerRegister from './Components/Passenger/PassengerRegister.jsx'
import PassengerLogin from './Components/Passenger/PassengerLogin.jsx'

import PassDash from './Components/Passenger/PassDash.jsx'

function App() {
 

  return (
   <>
    <ToastContainer autoClose={1000} position='top-center' />
    <Routes>
         
        <Route path='/' element={<Firstpage/>}/>
        <Route path='/adminlog' element={<Adminlog/>}/>
        <Route path='/adminforget' element={<Adminforget/>}/>
        <Route path='/stafflog' element={<Stafflog/>}/>
        <Route path='/passenger' element={<PassengerRegister/>}/>
        <Route path='/passenger/login' element={<PassengerLogin/>}/>
        <Route path='/passenger/login/forgot' element={<Passforget/>}/>
        <Route path='/adminlog/admin/:id' element={<Admindash/>}/>
        <Route path='/adminlog/admin/:id/addflight' element={<Addflight/>}/>
        <Route path='/adminlog/admin/bulkflight' element={<Bulkupdate/>}/>
        <Route path='/adminlog/admin/flightedit/:id/:sf' element={<Flightedit/>}/>
        <Route path='/adminlog/admin/addshuttle/:id' element={<Addshuttle/>}/>
        <Route path='/adminlog/admin/updateshuttle/:type/:id' element={<Shuttleedit/>}/>
        <Route path='/adminlog/admin/staffreg' element={<Staffreg/>}/>
        <Route path='/stafflog/staff/:id' element={<Staffdash/>}/>
        <Route path='/passenger/login/:id' element={<PassDash/>}/>
    </Routes> 
  
  
     
    </>
  )
}

export default App
