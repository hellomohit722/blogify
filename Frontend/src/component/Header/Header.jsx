import React from 'react';
import { Link, NavLink,useNavigate  } from 'react-router-dom';
import './Header.css';
import Button from '@mui/material/Button';
import axiosInstance from '../API/axiosInstance';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/user/logOut");
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-container">
          
          {/* Logo */}
          <Link to="/" className="logo">
            <h1 style={{fontSize: '24px', fontWeight: 'bold' }}>Blogify</h1>
          </Link>

          {/* Navigation Links */}
          <ul className="nav-links">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            {/* <li><NavLink to="/github" activeClassName="active">AI Help</NavLink></li> */}
          </ul>

          {/* Auth Buttons */}
          <div className="auth-buttons">
            <Link to="/addBlog" className="btn signup-btn">
              Create Blog
            </Link>
            <div className="logout-div">
            <Button onClick={handleLogout} className="btn logout-btn">
              logOut
            </Button>
            </div>
          </div>


        </div>
      </nav>
    </header>
  );
}
