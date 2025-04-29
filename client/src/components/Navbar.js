import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = () => {
    signOut();
    navigate('/signin');
  };
  
  return (
    <nav style={navStyle}>
      <div className="logo">
        <Link to="/" style={logoStyle}>AuthApp</Link>
      </div>
      <div className="nav-links">
        {currentUser ? (
          <>
            <Link to="/profile" style={linkStyle}>Profile</Link>
            <button onClick={handleSignOut} style={buttonStyle}>Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/signin" style={linkStyle}>Sign In</Link>
            <Link to="/signup" style={linkStyle}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

// Styles
const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 2rem',
  backgroundColor: '#f8f9fa',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const logoStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#007bff',
  textDecoration: 'none'
};

const linkStyle = {
  margin: '0 1rem',
  color: '#333',
  textDecoration: 'none'
};

const buttonStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: '#dc3545',
  fontSize: '1rem',
  margin: '0 1rem'
};

export default Navbar;