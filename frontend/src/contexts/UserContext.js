import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({ xp: 0, progress: 0, completedLessons: [] });

  const updateXP = (newXP) => {
    setUserData((prev) => ({ ...prev, xp: prev.xp + newXP }));
  };

  const updateProgress = (newProgress) => {
    setUserData((prev) => ({ ...prev, progress: newProgress }));
  };

  const addCompletedLesson = (lesson) => {
    setUserData((prev) => ({
      ...prev,
      completedLessons: [...prev.completedLessons, lesson],
    }));
  };

  return (
    <UserContext.Provider value={{ userData, updateXP, updateProgress, addCompletedLesson }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);