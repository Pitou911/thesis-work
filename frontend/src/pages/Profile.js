import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './../styles/Profile.css';

// Import medal images (adjust paths based on your project structure)
import pythonMedal from './../assets/medal.png';
import cppMedal from './../assets/medal.png';
import javaMedal from './../assets/medal.png';
import profilePicture from './../assets/profile.jpg';
const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userXp, setUserXp] = useState(user?.xp || 0);
  const [completedLanguages, setCompletedLanguages] = useState([]);

  const languageMap = {
    Python: 'PYTHON',
    'C++': 'CPP',
    Java: 'JAVA',
  };
  const languages = Object.keys(languageMap);

  const medalImages = {
    Python: pythonMedal,
    'C++': cppMedal,
    Java: javaMedal,
  };

  useEffect(() => {
    const fetchUserDataAndProgress = async () => {
      if (!user?.id) return;

      try {
        // Fetch user XP
        const userResponse = await fetch(`http://localhost:8080/api/users/${user.id}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();
        setUserXp(userData.xp);

        // Fetch progress for all languages
        const progressPromises = languages.map(async (language) => {
          const lessonsResponse = await fetch(`http://localhost:8080/api/lessons/language/${languageMap[language]}`);
          if (!lessonsResponse.ok) throw new Error(`Failed to fetch lessons for ${language}`);
          const lessons = await lessonsResponse.json();

          const progressResponse = await fetch(`http://localhost:8080/api/user_progress/${user.id}/${languageMap[language]}`);
          if (!progressResponse.ok) throw new Error(`Failed to fetch progress for ${language}`);
          const progress = await progressResponse.json();

          const totalLessons = lessons.length;
          const completedLessons = progress.filter(p => p.completed).length;
          const isCompleted = totalLessons > 0 && completedLessons === totalLessons;

          return { language, isCompleted };
        });

        const progressResults = await Promise.all(progressPromises);
        const completed = progressResults
          .filter(result => result.isCompleted)
          .map(result => result.language);
        setCompletedLanguages(completed);
      } catch (error) {
        console.error('Error fetching user data or progress:', error);
      }
    };

    fetchUserDataAndProgress();
  }, [user?.id]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="profile">
      <h1>Profile</h1>
      {user && (
        <div className="profile-info">
          <div className='profile-picture'>
            <img src={profilePicture} alt="Profile" />
          </div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>XP Earned:</strong> {userXp}</p>
          <div className="medals-section">
            <h3>Achievements</h3>
            {completedLanguages.length > 0 ? (
              <ul className="medals-list">
                {completedLanguages.map((language) => (
                  <li key={language} className="medal">
                    <img src={medalImages[language]} alt={`${language} Medal`} className="medal-image" />
                    <span>{language} Master</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No languages fully completed yet. Keep learning!</p>
            )}
          </div>
        </div>
      )}
      <button onClick={handleLogout} className="btn logout-btn">Log out</button>
    </div>
  );
};

export default Profile;