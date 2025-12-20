import React from 'react'
import BookList from './Components/BookList'
import AddLoanForm from './Components/AddLoanForm'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Books from './Pages/Books'
import Loan from './Pages/Loan'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Topnav from './Pages/Topnav'
import Reserve from './Pages/Reserve'
import ForgotPassword from './Components/ForgotPassword'

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
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        
        
      </Routes>
    </Router>
   </>
  
  )
}

export default App
