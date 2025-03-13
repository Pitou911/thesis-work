import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../styles/Navbar.css';
import logo from './../assets/logo.png';
import profile from './../assets/profile.jpg';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user } = useAuth();
  const [userLevel, setUserLevel] = useState(1);
  const [userXp, setUserXp] = useState(user?.xp || 0);
  const [levelProgress, setLevelProgress] = useState(0);

  const getXpForLevel = (level) => {
    return 50 * (level * level - level + 2);
  };

  const calculateLevelAndProgress = (xp) => {
    let level = 1;
    while (getXpForLevel(level + 1) <= xp) {
      level++;
    }
    const currentLevelXp = getXpForLevel(level);
    const nextLevelXp = getXpForLevel(level + 1);
    const xpInCurrentLevel = xp - currentLevelXp;
    const xpNeededForNextLevel = nextLevelXp - currentLevelXp;
    const progress = (xpInCurrentLevel / xpNeededForNextLevel) * 100;
    return { level, progress: Math.min(progress, 100) };
  };

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

  // Initial fetch and event listener
  useEffect(() => {
    fetchUserData();

    // Listen for XP update events
    const handleXpUpdate = () => {
      fetchUserData();
    };
    window.addEventListener('xpUpdated', handleXpUpdate);

    // Cleanup listener
    return () => {
      window.removeEventListener('xpUpdated', handleXpUpdate);
    };
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