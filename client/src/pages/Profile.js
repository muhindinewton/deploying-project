import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <div>Loading profile...</div>;
  }
  
  return (
    <div style={containerStyle}>
      <h2>User Profile</h2>
      
      <div style={profileCardStyle}>
        <div style={profileAvatarStyle}>
          {currentUser.username.charAt(0).toUpperCase()}
        </div>
        
        <div style={profileDetailsStyle}>
          <h3>{currentUser.username}</h3>
          <p style={emailStyle}>{currentUser.email}</p>
          <p style={dateStyle}>User ID: {currentUser.id}</p>
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  maxWidth: '800px',
  margin: '2rem auto',
  padding: '2rem',
  backgroundColor: '#fff',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const profileCardStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '1.5rem',
  backgroundColor: '#f8f9fa',
  borderRadius: '5px',
  marginTop: '1rem'
};

const profileAvatarStyle = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  backgroundColor: '#007bff',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginRight: '1.5rem'
};

const profileDetailsStyle = {
  flex: '1'
};

const emailStyle = {
  color: '#6c757d',
  marginBottom: '0.5rem'
};

const dateStyle = {
  fontSize: '0.9rem',
  color: '#6c757d'
};

export default Profile;