import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Styles/navbar.css'
import CartButton from './CartButton';

const Navbar = () => {
 const [menuOpen, setMenuOpen] = useState(false);
 const navigate = useNavigate();

 const handleLinkClick = () => {
    setMenuOpen(false);
 }
 const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
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
            <li><Link to="/drugs" onClick={handleLinkClick}>View drugs</Link></li>
            <li><Link to="/shops" onClick={handleLinkClick}>Shops</Link></li>
            <li><Link to="/login" onClick={handleLinkClick}>Login</Link></li>
            {/* <li><button onClick={handleLogout}>Logout</button></li> */}
        </ul>

        <div>
            <CartButton/>
        </div>
    </nav>
  )
}

export default Navbar
