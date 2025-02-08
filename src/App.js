// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import DailyLog from './pages/DailyLog';
import AIChat from './pages/AIChat';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import Milestones from './pages/Milestones';

function App() {
  return (
    <div>
      <Navbar />
      <div  style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/daily-log" element={<DailyLog />} />
          <Route path="/ai-chat" element={<AIChat />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/milestones" element={<Milestones />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
