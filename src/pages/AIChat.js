import React, { useState } from 'react';
import api from '../services/api';
import { Container } from 'reactstrap';
import './AIChat.css';

const AIChat = () => {
  const [question, setQuestion] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/ai/qa', { question });
      setChatResponse(res.data.answer || 'No answer received.');
      setQuestion('');
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setChatResponse('Error fetching AI response.');
    }
  };

  return (
    <Container className="garden-dashboard-content mt-4">
      <h1 className="garden-heading">Gardening Q&A</h1>
      <div className="ai-chat-box">
        <form onSubmit={handleSubmit}>
          <label className="form-label">Ask your gardening question:</label>
          <textarea 
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question..."
            rows="4"
            className="ai-chat-textarea"
          ></textarea>
          <button type="submit" className="ai-chat-button">Submit Question</button>
        </form>
        {chatResponse && (
          <div className="ai-chat-response">
            <h2>AI Response:</h2>
            <p>{chatResponse}</p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default AIChat;
