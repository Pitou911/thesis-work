import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../styles/Navbar.css';
import logo from './../assets/logo.png';
import { useAuth } from '../contexts/AuthContext';
import profile from './../assets/profile.jpg';

const Navbar = () => {
  const { user } = useAuth();
  const [userLevel, setUserLevel] = useState(1); // Current level
  const [userXp, setUserXp] = useState(user?.xp || 0); // Current XP
  const [levelProgress, setLevelProgress] = useState(0); // Progress percentage to next level

  // Function to calculate XP required for a given level
  const getXpForLevel = (level) => {
    return 50 * (level * level - level + 2);
  };

  // Function to calculate current level and progress from XP
  const calculateLevelAndProgress = (xp) => {
    // Find current level
    let level = 1;
    while (getXpForLevel(level + 1) <= xp) {
      level++;
    }

    const currentLevelXp = getXpForLevel(level); // XP needed for current level
    const nextLevelXp = getXpForLevel(level + 1); // XP needed for next level
    const xpInCurrentLevel = xp - currentLevelXp; // XP earned beyond current level
    const xpNeededForNextLevel = nextLevelXp - currentLevelXp; // Total XP needed to reach next level
    const progress = (xpInCurrentLevel / xpNeededForNextLevel) * 100; // Percentage to next level

    return { level, progress: Math.min(progress, 100) }; // Cap at 100%
  };

  // Fetch user XP and calculate level/progress
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return;

      try {
        const response = await fetch(`http://localhost:8080/api/users/${user.id}`);
        if (!response.ok) throw new Error('Failed to fetch user data');
        const userData = await response.json();
        setUserXp(userData.xp);
        const { level, progress } = calculateLevelAndProgress(userData.xp);
        setUserLevel(level);
        setLevelProgress(progress);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user?.id]);

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="logo" className="logo-img" />
        <div className="logo">
          <Link to="/">ProgPlay</Link>
        </div>
      </div>
      <ul className="nav-links">
        <li><Link to="/learning-path">Learning Path</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      {user ? (
        <div className="user-actions">
          <Link to="/profile" className="profile-img">
            <img src={profile} alt="User Avatar" />
          </Link>
          <div className="level-progress">
            <span className="level-text">Level {userLevel}</span>
            <div className="level-bar">
              <div
                className="level-fill"
                style={{ width: `${levelProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="buttons">
          <Link to="/login" className="btn login-btn">Log in</Link>
          <Link to="/signup" className="btn signup-btn">Start Now</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;