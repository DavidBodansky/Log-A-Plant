// src/pages/AIChat.js
import React, { useState } from 'react';
import api from '../services/api';

const AIChat = () => {
  const [question, setQuestion] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call your Flask endpoint for AI Q&A. Adjust the endpoint as necessary.
      const res = await api.post('/ai/qa', { question });
      setChatResponse(res.data.answer || 'No answer received.');
      setQuestion('');
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setChatResponse('Error fetching AI response.');
    }
  };

  return (
    <div>
      <h1>Gardening Q&A</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ask your gardening question:</label><br />
          <textarea 
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question..."
            rows="3"
            cols="50"
          ></textarea>
        </div>
        <button type="submit">Submit Question</button>
      </form>
      {chatResponse && (
        <div>
          <h2>AI Response:</h2>
          <p>{chatResponse}</p>
        </div>
      )}
    </div>
  );
};

export default AIChat;
