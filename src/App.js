// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DailyLog from './pages/DailyLog';
import AIChat from './pages/AIChat';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <Routes>
        {/* 
          For the Dashboard route, 
          we do NOT include the Navbar from App.js 
          because Dashboard.js already has its own navbar. 
        */}
        <Route path="/" element={<Dashboard />} />

        {/* 
          For all other routes, 
          render the Navbar first, then the page component.
        */}
        <Route
          path="/daily-log"
          element={
            <>
              <Navbar />
              <DailyLog />
            </>
          }
        />
        <Route
          path="/ai-chat"
          element={
            <>
              <Navbar />
              <AIChat />
            </>
          }
        />
        <Route
          path="/recipes"
          element={
            <>
              <Navbar />
              <Recipes />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Navbar />
              <Profile />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
