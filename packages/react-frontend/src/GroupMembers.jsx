import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './GroupPage.css';

const GroupMembers = () => {
  const { id } = useParams()
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const API_PREFIX = import.meta.env.VITE_API_PREFIX;
    const token = localStorage.getItem("token");
    

    const getGroupMembers = async () => {
      try {
      const result = await fetch(`${API_PREFIX}/groups/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`,
        },
      });

      if (result.ok) {
        const data = await result.json();
        setMembers(data);
      } else {
        const error = await result.json();
        console.log(error);
        throw new Error(error);
      }

      } catch (error) {
        console.log(error);
        // alert("Something went wrong:", error)
      }
    };

    getGroupMembers();
      
  }, []);

  return (
    <div className="group-page">
      <button className="back-button" onClick={() => navigate(-1)}>←</button>
      <h2> Members</h2>
      <ul className="member-list">
        {members.length > 0 ? (
          members.map((member) => 
            <li key={member.group_member_id} className="member-item">
            {member.firstname} {member.lastname}
            </li>
            )) : (
          <li>No members found.</li>
        )}
      </ul>
    </div>
  );
};

export default GroupMembers;
