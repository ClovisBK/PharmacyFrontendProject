import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Styles/navbar.css'

const Navbar = () => {
 const [menuOpen, setMenuOpen] = useState(false);

 const handleLinkClick = () => {
    setMenuOpen(false);
 }
  return (
    <nav className='navbar'>
        <div className='navbar-brand'>
            <Link to={'/'}>LiBook</Link>
        </div>
            <button className='menu-toggle' onClick={() => setMenuOpen(!menuOpen)}>
                {'\u2630'}
            </button>
        
        <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
            <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
            <li><Link to="/books" onClick={handleLinkClick}>Books</Link></li>
            <li><Link to="/shops" onClick={handleLinkClick}>Shops</Link></li>
            <li><Link to="/login" onClick={handleLinkClick}>Login</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar
