// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#ddd' }}>
      <Link style={{ margin: '10px' }} to="/">Dashboard</Link>
      <Link style={{ margin: '10px' }} to="/daily-log">Daily Log</Link>
      <Link style={{ margin: '10px' }} to="/ai-chat">Gardening Q&A</Link>
      <Link style={{ margin: '10px' }} to="/recipes">Recipes</Link>
      <Link style={{ margin: '10px' }} to="/milestones">Milestones</Link>
    </nav>
  );
};

export default Navbar;
