// src/components/Navbar.js
import React, { useState } from 'react';
import {
  Navbar as ReactstrapNavbar,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';  // We'll create/update this stylesheet

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    console.log("Logout clicked");
    // Your logout logic here (e.g., clear tokens, redirect, etc.)
  };

  return (
    <ReactstrapNavbar className="garden-navbar" expand="md">
      {/* Left side links */}
      <Nav className="mr-auto" navbar>
        <NavItem>
          <Link className="garden-nav-link" to="/">Dashboard</Link>
        </NavItem>
        <NavItem>
          <Link className="garden-nav-link" to="/daily-log">Daily Log</Link>
        </NavItem>
        <NavItem>
          <Link className="garden-nav-link" to="/ai-chat">Gardening Q&A</Link>
        </NavItem>
        <NavItem>
          <Link className="garden-nav-link" to="/recipes">Recipes</Link>
        </NavItem>
        <NavItem>
          <Link className="garden-nav-link" to="/milestones">Milestones</Link>
        </NavItem>
      </Nav>

      {/* Right side profile dropdown */}
      <Nav className="ml-auto" navbar>
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
            <DropdownItem onClick={handleLogout}>
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Nav>
    </ReactstrapNavbar>
  );
};

export default Navbar;
