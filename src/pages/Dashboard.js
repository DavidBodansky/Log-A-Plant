import React, { useState } from 'react';
import { 
  Container, 
  Navbar, 
  Nav, 
  NavItem, 
  Button, 
  Dropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem 
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './Dashboard.css';  // Custom CSS for garden-themed styling

const Dashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  // Static gardening tip
  const gardeningTip = "Water your plants early in the morning for optimal absorption and healthy growth!";

  return (
    <div>
      {/* Garden-themed Header */}
      <Navbar className="garden-navbar" expand="md">
        <Nav className="mr-auto" navbar>
          <NavItem className="sidebar-toggler" onClick={() => {/* Optionally toggle sidebar */}}>
            <i className="fa fa-leaf fa-2x text-white" />
          </NavItem>
          {/* Removed search field */}
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem className="mx-2">
            <Button color="success" className="garden-btn">
              <i className="fa fa-plus" /> New Entry
            </Button>
          </NavItem>
          <NavItem className="mx-2">
            <Button color="warning" className="garden-btn">
              <i className="fa fa-tree" /> Plant Info
            </Button>
          </NavItem>
          <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle nav caret className="garden-user">
              <img 
                src="/images/garden_avatar.jpg" 
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
              <DropdownItem onClick={() => {/* handle logout */}}>
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
