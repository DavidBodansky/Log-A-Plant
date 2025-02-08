import React, { useState, useCallback } from 'react';
import api from '../services/api';
import { Container } from 'reactstrap';
import './DailyLog.css';
import { getUserID } from '../services/user';

const DailyLog = () => {
  const [log, setLog] = useState({
    notes: '',
    stage: 'Initial Seeding',
    date: new Date().toISOString().split('T')[0],
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e) => {
    setLog({ ...log, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    if (file.type.startsWith('image/')) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setResponseMessage('Please upload an image file.');
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    setImagePreview(null);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('caption', log.notes);
      formData.append('stage', log.stage);
      if (image) {
        formData.append('image', image);
      }

      const res = await api.post(`/user/${getUserID()}/new/log`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResponseMessage(res.data.message || 'Log submitted successfully.');
      setLog({ ...log, notes: '' });
      setImage(null);
      setImagePreview(null);
      
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (error) {
      console.error('Error submitting log:', error);
      setResponseMessage('Error submitting log.');
    }
  };

  return (
    <Container className="garden-dashboard-content mt-4">
      <div className="daily-log-box">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Notes:</label>
            <textarea 
              name="notes"
              value={log.notes}
              onChange={handleChange}
              placeholder="Enter your gardening progress..."
              rows="4"
              className="daily-log-textarea"
            ></textarea>
          </div>
          
          <div className="form-group">
            <label>Growth Stage:</label>
            <select 
              name="stage" 
              value={log.stage} 
              onChange={handleChange} 
              className="daily-log-select"
            >
              <option value="Initial Seeding">Initial Seeding</option>
              <option value="First Growth">First Growth</option>
              <option value="Flowering">Flowering</option>
              <option value="Harvest">Harvest</option>
            </select>
          </div>

          <div className="form-group">
            <label>Upload Image:</label>
            <div 
              className={`file-drop-zone ${isDragging ? 'dragging' : ''} ${imagePreview ? 'has-image' : ''}`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
                id="file-input"
              />
              {!imagePreview && (
                <div className="drop-zone-content">
                  <div className="upload-icon">📸</div>
                  <p>Drag and drop your plant here or</p>
                  <label htmlFor="file-input" className="browse-button">
                    Browse Files
                  </label>
                </div>
              )}
              {imagePreview && (
                <div className="image-preview">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="preview-image"
                  />
                  <div className="image-actions">
                    <button 
                      type="button" 
                      onClick={handleDeleteImage}
                      className="btn btn-secondary btn-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button type="submit" className="daily-log-button">Submit Log</button>
        </form>
        {responseMessage && <p className="response-message">{responseMessage}</p>}
      </div>
    </Container>
  );
};

export default DailyLog;
