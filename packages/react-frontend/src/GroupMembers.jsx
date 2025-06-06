import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './GroupPage.css';

const GroupMembers = () => {
  const { groupName } = useParams();
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://chorecore-api-f2b2esdrg4g6exfy.westus3-01.azurewebsites.net/groups/${groupName}/members`)
      .then(res => res.ok ? res.json() : [])
      .then(data => setMembers(data.members || []))
      .catch(() => setMembers([]));
  }, [groupName]);

  return (
    <div className="group-page">
      <button className="back-button" onClick={() => navigate(-1)}>←</button>
      <h2>{groupName} Members</h2>
      <ul className="member-list">
        {members.length > 0 ? (
          members.map((member, index) => <li key={index}>{member}</li>)
        ) : (
          <li>No members found.</li>
        )}
      </ul>
    </div>
  );
};

export default GroupMembers;
