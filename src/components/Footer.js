import React from 'react';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='footer-logo'>
          <Link to='/'>Meg's Expense Tracker</Link>
        </div>
        <div className='footer-links'>
          <Link to='/privacy-policy'>Privacy Policy</Link>
          <Link to='/terms'>Terms of Service</Link>
          <Link to='/contact'>Contact Us</Link>
        </div>
        <div className='footer-social'>
          <a href='https://facebook.com' target='_blank' rel='noreferrer'>
            <img src='/assets/icons/facebook-icon.svg' alt='Facebook' />
          </a>
          <a href='https://twitter.com' target='_blank' rel='noreferrer'>
            <img src='/assets/icons/twitter-icon.svg' alt='Twitter' />
          </a>
          <a href='https://instagram.com' target='_blank' rel='noreferrer'>
            <img src='/assets/icons/instagram-icon.svg' alt='Instagram' />
          </a>
        </div>
      </div>
      <div className='footer-bottom'>
        <p>&copy; 2024 Meg's Expense Tracker. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
