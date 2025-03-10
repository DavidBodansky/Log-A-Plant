// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import pfpImage from '../images/pfp.png';
import { 
  Container, 
  Navbar, 
  Nav, 
  NavItem, 
  Dropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem 
} from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [gardeningTip, setGardeningTip] = useState('');

  // List of 20 gardening tips
  const gardeningTips = [
    "Water your plants early in the morning for optimal absorption and healthy growth!",
    "Ensure your plants receive enough sunlight based on their specific needs.",
    "Use organic compost to improve soil health and boost plant growth.",
    "Prune dead or diseased branches regularly to encourage new growth.",
    "Mulch around your plants to retain moisture and prevent weed growth.",
    "Rotate your crops every year to avoid soil depletion and pests.",
    "Plant herbs like basil, mint, and rosemary to enhance flavor and fragrance.",
    "Ensure good drainage for potted plants to avoid root rot.",
    "Use rainwater for your plants whenever possible to conserve water.",
    "Keep an eye out for pests and act quickly to prevent damage.",
    "Add nitrogen-rich fertilizer to your plants for lush, green foliage.",
    "Keep your garden tools clean and sharpened for efficient work.",
    "Harvest crops when they are fully ripe for the best taste and nutrition.",
    "Learn about the native plants in your area and incorporate them into your garden.",
    "Grow companion plants that help each other thrive and protect from pests.",
    "Incorporate flowers into your garden to attract pollinators like bees and butterflies.",
    "Be patient with plant growth; gardening takes time and care.",
    "Water deeply and less frequently to encourage strong root systems.",
    "Test your soil regularly to ensure the right pH and nutrient levels.",
    "Consider growing drought-tolerant plants to save water in the garden."
  ];

  // Randomly select a gardening tip on mount
  useEffect(() => {
    const randomTip = gardeningTips[Math.floor(Math.random() * gardeningTips.length)];
    setGardeningTip(randomTip);
  }, []);

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  const handleLogout = () => {
    console.log("Logout clicked");
    // Add logout logic (e.g. clearing tokens, redirecting) here
  };

  return (
    <div>

      {/* Main dashboard content below the navbar */}
      <Container className="garden-dashboard-content mt-4">
        {/* Welcome Ares moved to top left */}
        <div className="welcome-text">
          <h1 className="garden-heading">Welcome, Ares</h1>
          <p className="welcome-paragraph">
          We're thrilled you're tending to your garden here!
          Log plant progress and learn about sustainable environmental practices.
          Feel free to explore recipes after you've harvested your fully grown crops!
          If you have questions about soil conditions, watering schedules, or planting seasons? Our AI chatbot is here to offer expert guidance, whether you're a beginner or a seasoned gardener. 
          Happy gardening!
          <Link className="ai-chat-link" to="/ai-chat"><span>Ask AI</span><img className="ai-spark" src={require("../images/ai-spark.png")}/></Link>
          </p>
        </div>

        {/* Tip box with old styling (transparent box, absolute position, etc.) */}
        <div className="garden-tip-box">
          {/* Lightbulb icon */}
          <img 
            src={require('../images/lightbulbTips.png')} 
            alt="Tip Icon" 
            className="tip-icon" 
          />
          <h3>Today's Gardening Tip</h3>
          <p>{gardeningTip}</p>
        </div>

      </Container>
    </div>
  );
};

export default Dashboard;
