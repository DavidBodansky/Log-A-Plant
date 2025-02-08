import './Profile.css';
import FeedItem from './FeedItem';
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { getUserID } from '../services/user';
import pfpImage from '../images/pfp.png';

const Profile = () => {
  const [feedData, setFeedData] = useState([]); // State to store the feed data

  useEffect(() => {
    // This will only run once when the component mounts
    const fetchFeedData = async () => {
      try {
        const res = await api.get(`/user/${getUserID()}/logs`);
        setFeedData(res.data || [])
      } catch (error) {
        alert(error);
      }
    };

    fetchFeedData();
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    <div className="container">
      <div className="user-info w-full flex">
        <div className="left">
          <img 
            src={pfpImage}
            alt="Gardener" 
            className="rounded-circle pfp object-cover" 
          />
        </div>
        <div className="right">
          <div className="intro">
            <h3>Hi,</h3>
            <h1>Ares</h1>
          </div>
          <p className="with-us">
            User created two months ago!
          </p>
        </div>
      </div>
      <main>
        {feedData.map((log) => (
          <FeedItem 
            {...log}
          />
        ))}
      </main>
    </div>
  );
}

export default Profile;
