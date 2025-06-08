import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MakeGroup.css'; // Import custom CSS
// import { getUserIdFromToken } from "./utils/decodeToken";




const MakeGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const token = localStorage.getItem("token"); // 🔥 pull it here directly
  const navigate = useNavigate();

  // useEffect(() => {
  //   // const userId = getUserIdFromToken(token);
  //   // console.log("🛠️ MakeGroup user_id:", userId);
  // }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("using token:", token);
    console.log('Group Name:', groupName);
    console.log('Group Description:', groupDescription);
  
    const payload = {
      group_name: groupName,
      group_description: groupDescription,
    };
  
    try {
      const API_PREFIX = import.meta.env.VITE_API_PREFIX;
  
      const response = await fetch(`${API_PREFIX}/groups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert('Group created, group ID: ' + data.group_id);
      } else {
        const error = await response.json();
        alert('Failed to create group. Please try again.' + error.error);
      }
    } catch (err) {
      console.error('Error creating group:', err);
      alert('network error');
    }
  };
  
  return (
    <div className="makegroup-container">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <button className="back-button" onClick={() => navigate(-1)}> &larr;</button>
      </div>

      <div className="makegroup-box">
        <h1 className="makegroup-title">Chore Core</h1>
        <h2 className="makegroup-subtitle">Create Group</h2>

        <form onSubmit={handleSubmit} className="makegroup-form">
          <div>
            <label>Group Name</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter here"
              required
            />
          </div>

          <div>
            <label>Group Description</label>
            <input
              type="text"
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              placeholder="Enter here"
            />
          </div>

          <button type="submit">Create Group</button>
        </form>
      </div>
    </div>
  );
};

export default MakeGroup;
