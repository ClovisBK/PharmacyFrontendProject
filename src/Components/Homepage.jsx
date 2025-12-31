import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './Styles/homepage.css'
import ProtectedRoute from './ProtectedRoute'

const Homepage = () => {
  return (
    <div className="homepage">

      <div className='home-upper-section'>


        <motion.h1
          className="homepage-heading"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to pharmaClo. A hub of guaranteed well-being
        </motion.h1>

      
        <motion.p
          className="homepage-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Find Pharmacies and make purchaces for your medication at <span className="text-blue-600 font-semibold">PharmaClo</span> — 
          Get in touch with trusted and reputable pharmacies at the comfort of your home <i className='fa-solid fa-home'></i>
        </motion.p>
          <ProtectedRoute>
              <Link to='/shops'>
                <motion.div
                  className="explore-btn"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  Explore Drug Shops
                </motion.div>
              </Link>
          </ProtectedRoute>
        

      </div>

     <div className='why-us'>
        <div className="why-us-hero">
          Why Choose PharmaClo?
        </div>
        <div className='why-us-cards'>
          <div className="why-us-card">
            <div className="icon">
              <i className='fa-solid fa-pills'></i>
            </div>
            <div className="why-us-heading">100% Genuine Medicines</div>
            <div className="why-us-text">All medications are sourced directly from authorized distributors and manufacturers</div>
          </div>
          <div className="why-us-card">
            <div className="icon">
              <i className='fa-solid fa-truck-fast'></i>
            </div>
            <div className="why-us-heading">Fast Delivery</div>
            <div className="why-us-text">Get your medications delivered within 30-60 minutes in major cities across Cameroon.</div>
          </div>
          
          <div className="why-us-card">
            <div className="icon">
              <i className='fas fa-user-md'></i>
            </div>
            <div className="why-us-heading">Pharmacy Verified</div>
            <div className="why-us-text">All pharmacies are licensed and verified by our quality assurance team.</div>
          </div>
          <div className="why-us-card">
            <div className="icon">
              <i className='fa fa-clock'></i>
            </div>
            <div className="why-us-heading">24/7 Service</div>
            <div className="why-us-text">Order anytime - day or night. Emergency medications available round the clock.</div>
          </div>
        </div>
     </div>
      

     
      <footer className="">
        © {new Date().getFullYear()}PharmaClo Limited . All rights reserved.
      </footer>
    </div>
  )
}

export default Homepage
