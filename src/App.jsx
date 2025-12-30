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
import PharmacyDrugs from './Components/PharmacyDrugs'
import { CartProvider } from './Components/CartContext'
import Checkout from './Components/Checkout'
import ProtectedRoute from './Components/ProtectedRoute'

function App() {

  return (
  <>
  <CartProvider>
      <Router>
          <Topnav/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path='/login'  element={<Login/>}/>
          <Route path='/drugs' element={<Books/>} />
          <Route path='/shops' element={<ProtectedRoute><Shops/></ProtectedRoute>} />
          <Route path='/pharmacy/:pharmacyId/drugs' element={<PharmacyDrugs/>} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />
          <Route path='/reset-password' element={<ResetPassword/>} />
          <Route path='/checkout' element={<Checkout/>} />
        </Routes>
      </Router>
  </CartProvider>
   </>
  
  )
}

export default App
