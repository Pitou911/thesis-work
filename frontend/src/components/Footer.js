import React from 'react';
import './../styles/Footer.css';
import address from './../assets/address.png';
import email from './../assets/email.png';
import phone from './../assets/call.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className='footer-title'>
          <h1>ProgPlay</h1>
          <p>Your Learning Duo</p>
      </div>
      <div className="footer-content">
        <div className="footer-section">
          <div className='footer-section__imgs'>
            <img className='footer--img' alt='address img' src={address}></img>
          </div>
          <h4>Debrecen, 4028</h4>
        </div>
        <div className="footer-section">
          <div className='footer-section__imgs'>
            <img className='footer--img' alt='email img' src={email}></img>
          </div>
          <h4>info@progplay.com</h4>
        </div>
        <div className="footer-section">
          <div className='footer-section__imgs'>
            <img className='footer--img' alt='phone img' src={phone}></img>
          </div>
          <h4>+36 12345678</h4>
        </div>
      </div>
      <p className="copyright">Copyright © 2025 ProgPlay. All rights reserved.</p>
    </footer>
  );
};

export default Footer;