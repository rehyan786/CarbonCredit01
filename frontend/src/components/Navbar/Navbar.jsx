import React, { useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className='navbar'>
      <div className='navbar-logo'>
        <img src="Smart sustainable logo .png" alt="Logo" />
      </div>

      {/* Hamburger Icon for mobile */}
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>

      <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>

        <li className={`dropdown ${dropdownOpen ? 'open' : ''}`} onClick={toggleDropdown}>
          <span>Carbon Prices ▾</span>
          <ul className="dropdown-content bg-blue-200">
            <li onClick={() => { navigate('/'); setMenuOpen(false); }}>Carbon Market</li>
            <li onClick={() => { navigate('/solar'); setMenuOpen(false); }}>Solar Prices</li>
            <li onClick={() => { navigate('/lithium'); setMenuOpen(false); }}>Lithium Prices</li>
          </ul>
        </li>

        <li><Link to="/features" onClick={() => setMenuOpen(false)}>Features</Link></li>
        <li><Link to="/news" onClick={() => setMenuOpen(false)}>Carbon News</Link></li>
        <li><Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link></li>
      </ul>

      <div className='navbar-right'>
        <button className='signup-button'>Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;