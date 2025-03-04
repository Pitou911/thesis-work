import React from 'react';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth
import { useNavigate } from 'react-router-dom';
import './../styles/Profile.css'; // Optional: Add styles for the profile page

const Profile = () => {
  const { user, logout } = useAuth(); // Get the user and logout function from AuthContext
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate('/login'); // Redirect to the login page after logout
  };

  return (
    <div className="profile">
      <h1>Profile</h1>
      {user && (
        <div className="profile-info">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>XP Earned:</strong> {user.xp}</p>
        </div>
      )}
      <button onClick={handleLogout} className="btn logout-btn">Log out</button>
    </div>
  );
};

export default Profile;