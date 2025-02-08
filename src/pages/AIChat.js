import React, { useState } from 'react';
import api from '../services/api';
import DOMPurify from 'dompurify';
import { Container } from 'reactstrap';
import './AIChat.css';

const AIChat = () => {
  const [question, setQuestion] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [isTitleVisible, setIsTitleVisible] = useState(true);
  const [isResized, setIsResized] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [isMoved, setIsMoved] = useState(false); // Track movement of the textbox

  // Event handler for form submission (sending the question)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsTitleVisible(false); // Hide title when question is submitted
    setIsResized(true); // Resize UI component immediately
    setIsMoved(true); // Move the textbox up
    setIsLoading(true); // Show "Loading..." in the textarea
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
    } finally {
      setIsLoading(false); // Hide loading state after the response is received
      setIsMoved(false); // Return the textbox to its original position
    }
  };

  // Event handler to clear the chat question and response
  const handleClear = () => {
    setQuestion('');
    setChatResponse('');
    setIsTitleVisible(true);
    setIsResized(false);
    setIsMoved(false); // Reset textbox position
  };

  return (
    <Container className={`garden-dashboard-content mt-4 ${isResized ? 'resized' : ''}`}>
      {isTitleVisible && <h1 className="ai-chat-heading">Gardening Q&A</h1>} {/* Conditionally render title */}
      <div className={`ai-chat-box ${isMoved ? 'moved' : ''}`}> {/* Apply movement only to the textbox */}
        <form onSubmit={handleSubmit}>
          <label className="form-label">Ask your gardening question:</label>
          <textarea 
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={isLoading ? 'Loading...' : 'Enter your question...'} // Change placeholder during loading
            rows="4"
            className="ai-chat-textarea"
            disabled={isLoading} // Disable textarea while loading
          ></textarea>
          <div className="ai-chat-buttons">
            <button type="submit" className="ai-chat-button" disabled={isLoading}>Submit Question</button>
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
