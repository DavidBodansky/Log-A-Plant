// src/components/Dashboard.js
import React from 'react';
import { Container } from 'reactstrap';
import './Dashboard.css';

const Dashboard = () => {
  // Example tip
  const gardeningTip = "Water your plants early in the morning for optimal absorption and healthy growth!";

  return (
    <div>
      <Container className="garden-dashboard-content mt-4">
        <h1 className="garden-heading">Welcome to Your Garden Diary</h1>
        <p className="garden-subheading">
          Track your plant growth, log your daily progress, and enjoy sustainable gardening tips.
        </p>
        <div className="garden-tip-box">
          <h3>Today's Gardening Tip</h3>
          <p>{gardeningTip}</p>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
