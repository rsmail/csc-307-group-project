import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';

const GroupList = ({ groups, onSelectGroup }) => (
  <div className="list-container">
    <div className="list-header">
      <h2 className="list-title">Groups</h2>
      <Link to="/MakeGroup" className="make-group-button">+ New Group</Link>
    </div>
    <div className="scroll-wrapper">
      <div className="scroll-gradient left" />
      <div className="scroll-gradient right" />
      <div className="scroll-content">
        {groups.map((group, index) => (
          <div key={index} className="scroll-item clickable" onClick={() => onSelectGroup(group)}>
            <div>{group.group_name}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TaskList = ({ tasks }) => (
  <div className="list-container">
    <div className="list-header">
      <h2 className="list-title">Tasks</h2>
      <Link to="/AssignTask" className="make-group-button">+ New Task</Link>
    </div>
    <div className="scroll-wrapper">
      <div className="scroll-gradient left" />
      <div className="scroll-gradient right" />
      <div className="scroll-content">
        {tasks.map((task, index) => (
          <div key={index} className="scroll-item">
            {task}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ScrollableList = ({ title, items }) => (
  <div className="list-container">
    <h2 className="list-title">{title}</h2>
    <div className="scroll-wrapper">
      <div className="scroll-gradient left" />
      <div className="scroll-gradient right" />
      <div className="scroll-content">
        {items.map((item, index) => (
          <div key={index} className="scroll-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const GroupDetails = ({ group, onBack }) => (
  <div className="group-details">
    <button className="back-button" onClick={onBack}>&larr;</button>
    <h2 className="group-title">{group.group_name}</h2>
    <ul className="task-list">
      {Array.from({ length: group.totalTasks }).map((_, index) => (
        <li key={index} className="task-item">Task {index + 1}</li>
      ))}
    </ul>
  </div>
);

const Homepage = () => {
  const [groups, setGroups] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [selectedGroup, setSelectedGroup] = useState(null);
  const navigate = useNavigate();
  const API_PREFIX = import.meta.env.VITE_API_PREFIX;

  useEffect( () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {

      const fetchGroupMembers = async () => {
        try {
          const res = await fetch(`${API_PREFIX}/groups`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          });

          if (res.ok) {
            const data = await res.json();
            setGroups(data);
          } else {
            const error = await res.json();
            alert("Error fetching groups: " + JSON.stringify());
          }

        } catch (error) {
          console.log(error);
          alert("Failed to load groups");
        } 
      }

      const fetchTasks = async () => {
        try {
          const res = await fetch(`${API_PREFIX}/tasks`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          });

          if (res.ok) {
            const data = await res.json();
            setTasks(data);
          } else {
            const error = await res.json();
            alert("Error fetching groups: " + JSON.stringify(error));
          }
        } catch (error) {
          console.log(error);
          alert("Failed to load tasks");
        }
      }

      fetchGroupMembers();
      fetchTasks();
    }
  }, [navigate]);

  return (
    <div className="homepage">
      <h1 className="homepage-title">Chore Core</h1>
      {!selectedGroup ? (
        <>
          <GroupList groups={groups} onSelectGroup={setSelectedGroup} />
          <TaskList tasks={tasks} />
        </>
      ) : (
        <GroupDetails group={selectedGroup} onBack={() => setSelectedGroup(null)} />
      )}
    </div>
  );
};

export default Homepage;
