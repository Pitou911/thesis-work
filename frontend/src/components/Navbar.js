import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/Navbar.css';
import logo from './../assets/logo.png';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth

const Navbar = () => {
  const { user } = useAuth(); // Get the user from AuthContext
  // const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className='logo-container'>
        <img src={logo} alt='logo' className='logo-img'></img>
        <div className="logo"><Link to="/">ProgPlay</Link></div>
      </div>
      <ul className="nav-links">
        <li><Link to="/learning-path">Learning Path</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      {user ? (
        <div className="user-actions">
          {/* Make the level-indicator clickable */}
          <Link to="/profile" className="profile-img">Profile</Link>
          {/* <Link to="/profile" className="level-indicator">Level 4</Link> */}
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