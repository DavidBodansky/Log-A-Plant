import React, { useState } from 'react';
import api from '../services/api';
import DOMPurify from 'dompurify';
import { Container } from 'reactstrap';
import './AIChat.css';

const AIChat = () => {
  const [question, setQuestion] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  // Event handler for form submission (sending the question)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call your Flask endpoint for AI Q&A.
      const res = await api.get('/ask', {
        params: {
          prompt: question
        }
      });
      setChatResponse(DOMPurify.sanitize(res.data) || 'No answer received.');
      setQuestion('');
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setChatResponse('Error fetching AI response.');
    }
  };

  // Event handler to clear the chat question and response
  const handleClear = () => {
    setQuestion('');
    setChatResponse('');
  };

  return (
    <Container className="garden-dashboard-content mt-4">
      <h1 className="ai-chat-heading">Gardening Q&A</h1>
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
          <div className="ai-chat-buttons">
            <button type="submit" className="ai-chat-button">Submit Question</button>
            <button type="button" className="ai-chat-button clear-button" onClick={handleClear}>
              Clear
            </button>
          </div>
        </form>
        {chatResponse && (
          <div className="ai-chat-response">
            <h2>AI Response:</h2>
            <p dangerouslySetInnerHTML={{__html: chatResponse}}></p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default AIChat;
