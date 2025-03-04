import React, { useState, useEffect } from 'react';
import LeaderboardTable from '../components/LeaderboardTable';
import { api } from './../services/api';
import './../styles/Leaderboard.css';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Attempt to fetch real data from the API
        const response = await api.getUsers();
        
        // Transform and sort API data by XP in descending order
        const sortedAndRankedData = response.data
          .sort((a, b) => (b.xp || 0) - (a.xp || 0))
          .map((user, index) => ({
            rank: index + 1,
            name: user.username,
            region: user.region || 'Hungary',
            xp: user.xp || 0
          }));

        setLeaderboardData(sortedAndRankedData);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        
        // Fallback to simulated data if API call fails
        const simulatedData = [
          { rank: 1, name: 'Song Pitou', region: 'Hungary', xp: 1200 },
          { rank: 2, name: 'John Doe', region: 'USA', xp: 1100 },
          { rank: 3, name: 'Alice Smith', region: 'Canada', xp: 1000 },
          { rank: 4, name: 'Bob Johnson', region: 'UK', xp: 900 },
        ];
        
        // Sort simulated data as well
        const sortedSimulatedData = simulatedData
          .sort((a, b) => b.xp - a.xp)
          .map((user, index) => ({
            ...user,
            rank: index + 1
          }));
        
        setLeaderboardData(sortedSimulatedData);
        setError('Could not fetch leaderboard data');
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (isLoading) {
    return <div className="leaderboard-loading">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="leaderboard-error">Error: {error}</div>;
  }

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <LeaderboardTable data={leaderboardData} />
    </div>
  );
};

export default Leaderboard;