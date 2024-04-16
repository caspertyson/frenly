import React from 'react';
import { Link } from 'react-router-dom'; // assuming you're using react-router
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import styles from './Footer.css';

const Footer = () => {
  return (
    <>
    <div className="footer-container">
      <div className="footer-column half-width">
        <h2>FRENLY</h2>
      </div>
      <div className="footer-column quarterWidth">
        <h2>Employers</h2><br/>
        <Link to="/sign-in-employer">Sign In</Link><br/><br/>
        <Link to="/employers">Dashboard</Link><br/><br/>
        <Link to="/post-listing">Post a Listing</Link>
      </div>
      <div className="footer-column quarterWidth">
        <h2>Candidates</h2><br/>
        <Link to="/sign-in">Sign In</Link><br/><br/>
        <Link onClick={() => window.location.href = '#streamline-container'} to="#streamline-container">Browse Listings</Link>
      </div>      
      <div className="footer-column quarterWidth">
        <h2>Frenly</h2><br/>
        <Link onClick={() => window.location.href = '#about'} to="#about">About</Link>
      </div>
    </div>
    <div className="footer-icons">
        <div id='footer-icon-left'>
            © 2024 Frenly
        </div>
        <div id='footer-icon-right'>
            <p>Follow Us: </p>
            <a href="https://www.instagram.com/frenly.nz/?hl=en" target="_blank" rel="noopener noreferrer"><FaInstagram size="20" color='black' /></a>
            <a id="fb-icon" href="https://twitter.com/Frenlyy_" target="_blank" rel="noopener noreferrer"><FaTwitter size="20" color='black'/></a>
        </div>
    </div>
    </>
  );
};

export default Footer;
