// src/Footer.js
import React from 'react';
import './Footer.css'; // Import a CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} GMRT. All rights reserved.</p>
        <ul className="footer-menu">
          <li className="footer-item">
            <a href="/privacy" className="footer-link">Privacy Policy</a>
          </li>
          <li className="footer-item">
            <a href="/terms" className="footer-link">Terms of Use</a>
          </li>
          {/* Add more footer links as needed */}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
