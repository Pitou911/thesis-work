import React from 'react';
import './../styles/LeaderboardTable.css';
const LeaderboardTable = ({ data }) => {
  return (
    <table className="leaderboard-table">
      <thead>
        <tr>
          <th>Rank #</th>
          <th>Name</th>
          <th>Region</th>
          <th>XP</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry, index) => (
          <tr key={index}>
            <td>{entry.rank}</td>
            <td>{entry.name}</td>
            <td>{entry.region}</td>
            <td>{entry.xp} XP</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeaderboardTable;