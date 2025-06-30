


import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className='navbar'>
      <div className='navbar-logo'>CarbonCredit</div>

      <ul className='navbar-links'>
        <li><Link to="/">Home</Link></li>
        <li className="dropdown">
          <span>Carbon Prices ▾</span>
          <ul className="dropdown-content">
            <li onClick={() => navigate('/')}>Carbon Market</li>
            <li onClick={() => navigate('/solar')}>Solar Prices</li>
            <li onClick={() => navigate('/lithium')}>Lithium Prices</li>
            {/* Add more as needed */}
          </ul>
        </li>
        <li><Link to="/features">Features</Link></li>
        <li><Link to="/news">Carbon News</Link></li>
        <li><Link to="/blog">Blog</Link></li>
      </ul>

      <div className='navbar-right'>
        {/* <select className='currency-select'>
          <option value='usd'>USD</option>
          <option value='inr'>INR</option>
        </select> */}
        <button className='signup-button'>Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
