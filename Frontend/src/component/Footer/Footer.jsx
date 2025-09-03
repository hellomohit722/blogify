import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <Link to="/">
              <h1 style={{fontSize: '24px', fontWeight: 'bold' }}>Blogify</h1>
            </Link>
          </div>

          <div className="footer-links">
            <div>
              <h2>Resources</h2>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
              </ul>
            </div>
            <div>
              <h2>Follow us</h2>
              <ul>
                <li>
                  <a href="https://github.com/hellomohit722" target="_blank" rel="noreferrer">
                    Github
                  </a>
                </li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h2>Legal</h2>
              <ul>
                <li><Link to="#">Privacy Policy</Link></li>
                <li><Link to="#">Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <span>
            © 2025 <a href="#">Mohit</a>. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
