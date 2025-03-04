import React from 'react';
import './../styles/UserProfile.css';

const UserProfile = ({ xp, progress, completedLessons }) => {
  return (
    <div className="user-profile">
      <h2>My Profile</h2>
      <p>XP: {xp}</p>
      <p>Progress: {progress}%</p>
      <p>Completed Lessons: {completedLessons.join(', ')}</p>
    </div>
  );
};

export default UserProfile;