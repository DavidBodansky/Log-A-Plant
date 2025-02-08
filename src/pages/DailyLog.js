// src/pages/DailyLog.js
import React, { useState } from 'react';
import api from '../services/api';

const DailyLog = () => {
  const [log, setLog] = useState({
    notes: '',
    stage: 'Initial Seeding',
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
  });
  
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    setLog({ ...log, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Using plant_id "1" for this prototype.
      const res = await api.post('/plants/1/logs', log);
      setResponseMessage(res.data.message || 'Log submitted successfully.');
      setLog({ ...log, notes: '' }); // Reset notes field after submit
    } catch (error) {
      console.error('Error submitting log:', error);
      setResponseMessage('Error submitting log.');
    }
  };

  return (
    <div>
      <h1>Daily Log</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Notes:</label><br />
          <textarea 
            name="notes"
            value={log.notes}
            onChange={handleChange}
            placeholder="Enter your daily gardening progress..."
            rows="4"
            cols="50"
          ></textarea>
        </div>
        <div>
          <label>Growth Stage:</label>
          <select name="stage" value={log.stage} onChange={handleChange}>
            <option value="Initial Seeding">Initial Seeding</option>
            <option value="First Growth">First Growth</option>
            <option value="Flowering">Flowering</option>
            <option value="Harvest">Harvest</option>
          </select>
        </div>
        <div>
          <label>Date:</label>
          <input type="date" name="date" value={log.date} onChange={handleChange} />
        </div>
        <button type="submit">Submit Log</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default DailyLog;
