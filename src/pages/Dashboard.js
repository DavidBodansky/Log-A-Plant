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
import { NavLink } from 'react-router-dom';
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
    "Test your soil regularly to ensure the right pH and nutrient levels for your plants.",
    "Consider growing drought-tolerant plants to save water in the garden."
  ];

  // Randomly select a gardening tip
  useEffect(() => {
    const randomTip = gardeningTips[Math.floor(Math.random() * gardeningTips.length)];
    setGardeningTip(randomTip);
  }, []); // The empty dependency array ensures this runs once when the component mounts

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  // Event Handlers
  const handleLogout = () => {
    console.log("Logout clicked");
    // You can add logout logic here (e.g., clearing tokens, redirecting, etc.)
  };

  return (
    <div>
      {/* Garden-themed Header */}
      <Navbar className="garden-navbar" expand="md">
        <Nav className="mr-auto" navbar>
          <NavItem className="sidebar-toggler" onClick={() => { /* Optionally toggle sidebar */ }}>
            <i className="fa fa-leaf fa-2x text-white" />
          </NavItem>
          {/* Removed search field */}
        </Nav>
        <Nav className="ml-auto" navbar>
          <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle nav caret className="garden-user">
              <img 
                src={pfpImage}
                alt="Gardener" 
                className="rounded-circle garden-avatar" 
              />
              <span className="garden-user-name">Gardener</span>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <NavLink to="/profile" className="garden-dropdown-link">Profile</NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink to="/settings" className="garden-dropdown-link">Settings</NavLink>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={handleLogout}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Nav>
      </Navbar>

      {/* Garden-themed Content Area */}
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
