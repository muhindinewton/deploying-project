import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, error } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!username || !email || !password) {
      alert('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);
    const success = await signUp(username, email, password);
    setIsLoading(false);
    
    if (success) {
      navigate('/');
    }
  };
  
  return (
    <div style={containerStyle}>
      <h2>Sign Up</h2>
      
      {error && <p style={errorStyle}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formGroupStyle}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        
        <div style={formGroupStyle}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        
        <div style={formGroupStyle}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        
        <div style={formGroupStyle}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          style={buttonStyle}
        >
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
      
      <p style={textStyle}>
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
};

// Styles
const containerStyle = {
  maxWidth: '400px',
  margin: '2rem auto',
  padding: '2rem',
  backgroundColor: '#fff',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const formGroupStyle = {
  marginBottom: '1rem'
};

const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  fontSize: '1rem',
  border: '1px solid #ddd',
  borderRadius: '4px'
};

const buttonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem'
};

const textStyle = {
  marginTop: '1rem',
  textAlign: 'center'
};

const errorStyle = {
  color: '#dc3545',
  textAlign: 'center',
  marginBottom: '1rem'
};

export default SignUp;