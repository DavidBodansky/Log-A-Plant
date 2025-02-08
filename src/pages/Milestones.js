import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Container } from 'reactstrap';
import './Milestones.css';

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
    <Container className="garden-dashboard-content mt-4">
      <h1 className="garden-heading">Gardening Milestones</h1>
      <div className="milestones-box">
        {milestones.length > 0 ? (
          <ul className="milestones-list">
            {milestones.map((ms, index) => (
              <li key={index} className="milestone-item">
                <strong>{ms.title}</strong>: {ms.description} <span className="milestone-date">(Date: {ms.date})</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No milestones recorded yet.</p>
        )}
      </div>
    </Container>
  );
};

export default Milestones;
