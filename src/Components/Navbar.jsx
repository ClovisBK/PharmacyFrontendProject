import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Styles/navbar.css'
import CartButton from './CartButton';
import { AuthContext } from '../Context/AuthContext';

const Navbar = () => {
 const [menuOpen, setMenuOpen] = useState(false);
 const { isLoggedIn, logout } = useContext(AuthContext);
 const navigate = useNavigate();

 const handleLinkClick = () => {
    setMenuOpen(false);
 }
 const handleLogout = () => {
   logout();
    navigate('/login');
 }
  return (
    <nav className='navbar'>
        <div className='navbar-brand'>
            <Link to={'/'}>PharmaClo</Link>
        </div>
            <button className='menu-toggle' onClick={() => setMenuOpen(!menuOpen)}>
                {'\u2630'}
            </button>
        
        <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
            <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
            <li><Link to="/dashboard" onClick={handleLinkClick}>Dashboard</Link></li>
            <li><Link to="/drugs" onClick={handleLinkClick}>View drugs</Link></li>
            <li><Link to="/shops" onClick={handleLinkClick}>Pharmacies</Link></li>
            {isLoggedIn ? 
                <li><button onClick={handleLogout}>Logout</button></li>
            :
                <li><Link to="/login" onClick={handleLinkClick}>Login</Link></li>
            }   
        </ul>

        <div>
            <CartButton/>
        </div>
    </nav>
  )
}

export default Navbar
