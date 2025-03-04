import React from 'react';
import './../styles/ProgressBar.css';
const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${progress}%` }}></div>
      <span>{progress}% Complete</span>
    </div>
  );
};

export default ProgressBar;