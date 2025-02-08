import React, { useState } from 'react';
import api from '../services/api';
import { Container } from 'reactstrap';
import './DailyLog.css';

const DailyLog = () => {
  const [log, setLog] = useState({
    notes: '',
    stage: 'Initial Seeding',
    date: new Date().toISOString().split('T')[0],
  });
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    setLog({ ...log, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/plants/1/logs', log);
      setResponseMessage(res.data.message || 'Log submitted successfully.');
      setLog({ ...log, notes: '' });
    } catch (error) {
      console.error('Error submitting log:', error);
      setResponseMessage('Error submitting log.');
    }
  };

  return (
    <Container className="garden-dashboard-content mt-4">
      <h1 className="garden-heading">Daily Log</h1>
      <div className="daily-log-box">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Notes:</label>
            <textarea 
              name="notes"
              value={log.notes}
              onChange={handleChange}
              placeholder="Enter your daily gardening progress..."
              rows="4"
              className="daily-log-textarea"
            ></textarea>
          </div>
          <div className="form-group">
            <label>Growth Stage:</label>
            <select name="stage" value={log.stage} onChange={handleChange} className="daily-log-select">
              <option value="Initial Seeding">Initial Seeding</option>
              <option value="First Growth">First Growth</option>
              <option value="Flowering">Flowering</option>
              <option value="Harvest">Harvest</option>
            </select>
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input 
              type="date" 
              name="date" 
              value={log.date} 
              onChange={handleChange} 
              className="daily-log-date"
            />
          </div>
          <button type="submit" className="daily-log-button">Submit Log</button>
        </form>
        {responseMessage && <p className="response-message">{responseMessage}</p>}
      </div>
    </Container>
  );
};

export default DailyLog;
