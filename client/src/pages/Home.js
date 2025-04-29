import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { currentUser } = useAuth();
  
  return (
    <div style={containerStyle}>
      <h1>Welcome to Auth App</h1>
      
      {currentUser ? (
        <div>
          <p>You are logged in as <strong>{currentUser.username}</strong></p>
          <Link to="/profile" style={buttonStyle}>
            View Profile
          </Link>
        </div>
      ) : (
        <div>
          <p>Please sign in to access your account</p>
          <div style={buttonContainerStyle}>
            <Link to="/signin" style={buttonStyle}>
              Sign In
            </Link>
            <Link to="/signup" style={{...buttonStyle, backgroundColor: '#28a745'}}>
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const containerStyle = {
  maxWidth: '800px',
  margin: '2rem auto',
  padding: '2rem',
  textAlign: 'center',
  backgroundColor: '#fff',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
  marginTop: '1rem'
};

const buttonStyle = {
  display: 'inline-block',
  padding: '0.5rem 1rem',
  backgroundColor: '#007bff',
  color: '#fff',
  borderRadius: '4px',
  textDecoration: 'none',
  fontWeight: 'bold'
};

export default Home;