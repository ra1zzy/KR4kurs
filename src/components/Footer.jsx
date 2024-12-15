import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-section">
        <h4>Contact Us</h4>
        <p>Email: support@learning.com</p>
        <p>Phone: +123 456 7890</p>
      </div>

      <div className="footer-section">
        <h4>Follow Us</h4>
        <p><a href="https://facebook.com">Facebook</a></p>
        <p><a href="https://twitter.com">Twitter</a></p>
        <p><a href="https://instagram.com">Instagram</a></p>
      </div>
    </footer>
  );
};

export default Footer;

