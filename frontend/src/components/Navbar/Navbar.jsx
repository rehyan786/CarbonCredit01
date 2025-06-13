import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='navbar-logo'>CarbonCredit</div>

      <ul className='navbar-links'>
        <li>Home</li>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>

      <div className='navbar-right'>
        <select className='currency-select'>
          <option value='usd'>USD</option>
          <option value='inr'>INR</option>
        </select>
        <button className='signup-button'>Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
