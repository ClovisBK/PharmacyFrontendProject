import React from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Books from './Pages/Books'
import Home from './Pages/Home'
import Topnav from './Pages/Topnav'
import './App.css'
import ForgotPassword from './Components/ForgotPassword'
import ResetPassword from './Components/ResetPassword'
import Shops from './Components/Shops'

function App() {

  return (
  <>
    <Router>
        <Topnav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path='/login'  element={<Login/>}/>
        <Route path='/books' element={<Books/>} />
        <Route path='/shops' element={<Shops/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path='/reset-password' element={<ResetPassword/>} />
      </Routes>
    </Router>
   </>
  
  )
}

export default App
