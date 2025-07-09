import React from "react";
import "./footer.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaLinkedinIn, FaPaperPlane } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="footer">
   
      <div className="footer-content">

        {/* Left Section */}
        <div className="footer-section about">
          <h2 className="logo-text">SOLAR<span>RECYCLING</span></h2>
          <p>
            Our vision is to reduce waste of 99.9% of the world's IT and solar
            materials by recycling and reuse, and energy generating disposal.
          </p>
          <div className="socials">
            <FaFacebookF />
            <FaTwitter />
            <FaLinkedinIn />
          </div>
        </div>

        {/* Middle Section - Links */}
        <div className="footer-section links">
          <h3>QUICK LINKS</h3>
          <ul>
            <li><a href="#">Recycling</a></li>
            <li><a href="#">Selling</a></li>
            <li><a href="#">Buying</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section contact">
          <h3>CONTACT</h3>
          <p><FaMapMarkerAlt /> 1736 E. Borchard Ave. Santa Ana, CA 92705</p>
          <p><FaPhoneAlt /> Local: (714) 647-9000</p>
          <p><FaPhoneAlt /> Toll Free: (800) 905-7329</p>
          <p><FaEnvelope /> info@solarrecycling.com</p>
        </div>
     
        {/* Newsletter */}
        <div className="footer-section newsletter">
          <h3>NEWS LETTER</h3>
          <div className="newsletter-input">
            <input type="email" placeholder="Enter Your Email" />
            <button><FaPaperPlane /></button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        Copyright © 2023 Solar Recycling. All rights reserved.
      </div>
     
    
    </footer>
  );
};

export default Footer;