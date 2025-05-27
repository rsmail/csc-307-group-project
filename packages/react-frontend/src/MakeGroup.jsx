import React, { useState } from 'react';
import './MakeGroup.css'; // Import custom CSS

const MakeGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Group Name:', groupName);
    console.log('Group Description:', groupDescription);
  };

  return (
    <div className="makegroup-container">
      <button className="back-button">&larr;</button>

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
