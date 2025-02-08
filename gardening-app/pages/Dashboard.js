// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Dashboard = () => {
  const [tip, setTip] = useState('');

  useEffect(() => {
    // Example: fetch a gardening tip from the backend.
    // Adjust the endpoint as needed.
    async function fetchTip() {
      try {
        const response = await api.get('/tips');
        setTip(response.data.tip || 'No tip available at the moment.');
      } catch (error) {
        console.error('Error fetching tip:', error);
        setTip('Error fetching tip.');
      }
    }
    fetchTip();
  }, []);

  return (
    <div>
      <h1>Gardening Diary Dashboard</h1>
      <p>Welcome to your gardening diary! Track your plant progress, ask questions, and get sustainable tips.</p>
      <div>
        <h2>Today's Gardening Tip</h2>
        <p>{tip}</p>
      </div>
    </div>
  );
};

export default Dashboard;
