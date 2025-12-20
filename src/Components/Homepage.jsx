import React from 'react'
import { motion } from 'framer-motion'

const Homepage = () => {
  return (
    <div className="homepage flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800 px-6 text-center">
      
     
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-4 text-blue-700"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to Champions' Library
      </motion.h1>

     
      <motion.p
        className="text-lg md:text-xl max-w-2xl leading-relaxed text-gray-600 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Dive into your <span className="text-blue-600 font-semibold">school of knowledge</span> — 
        where curiosity sparks discovery. Explore, borrow, and enjoy books that 
        expand your world and feed your imagination. Don't be left behind!
      </motion.p>

      
      <motion.a
        href="/books"
        className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition-all"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        Explore Our Collection
      </motion.a>

     
      <motion.div
        className="mt-10 max-w-lg italic text-gray-500 text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.7 }}
      >
        “A room without books is like a body without a soul.” — Marcus Tullius Cicero
      </motion.div>

     
      <footer className="absolute bottom-1 text-gray-600 text-sm">
        © {new Date().getFullYear()} Clovis Library. All rights reserved.
      </footer>
    </div>
  )
}

export default Homepage
