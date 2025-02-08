// src/pages/Milestones.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Milestones = () => {
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    async function fetchMilestones() {
      try {
        const res = await api.get('/milestones');
        setMilestones(res.data.milestones || []);
      } catch (error) {
        console.error('Error fetching milestones:', error);
      }
    }
    fetchMilestones();
  }, []);

  return (
    <div>
      <h1>Gardening Milestones</h1>
      {milestones.length > 0 ? (
        <ul>
          {milestones.map((ms, index) => (
            <li key={index}>
              <strong>{ms.title}</strong>: {ms.description} (Date: {ms.date})
            </li>
          ))}
        </ul>
      ) : (
        <p>No milestones recorded yet.</p>
      )}
    </div>
  );
};

export default Milestones;
