import React, { useEffect, useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';

import './HomePage.css';
import GroupPage from './GroupPage';

const ProgressBar = ({ completed, total }) => {
  const percent = Math.round((completed / total) * 100);
  return (
    <div className="progress-bar-wrapper">
      <div className="progress-bar-background">
        <div
          className="progress-bar-fill"
          style={{ width: `${percent}%`, backgroundColor: percent === 100 ? '#4caf50' : '#2196f3' }}
        ></div>
      </div>
      <div className="progress-label">{percent}%</div>
    </div>
  );
};

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
          <div key={index} className="scroll-item clickable" onClick={() => onSelectGroup(group.group_name)}>
            <div>{group.group_name}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TaskList = ({ tasks }) => (
  <div className="list-container">
    <h2 className="list-title">Progress</h2>
    <div className="vertical-scroll-wrapper">
      {groups.map((group, index) => (
        <div key={index} className="progress-item">
          <div className="progress-group-name">{group.group_name}</div>
          <ProgressBar completed={group.completed_tasks} total={group.total_tasks} />
        </div>
      ))}
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
            {item.name}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Homepage = () => {
  const [selectedGroupName, setSelectedGroupName] = useState(null);
  const [groups, setGroups] = useState([]);
  const [tasks, setTasks] = useState([]);
  const API_PREFIX = import.meta.env.VITE_API_PREFIX;
  const navigate = useNavigate();

  useEffect( () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      const fetchGroups = async () => {
        try {
          const result = await fetch(`${API_PREFIX}/groups`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `${token}`,
            },
          });

          if (result.ok) {
            const data = await result.json();
            setGroups(data);
          } else {
            const error = await result.json();
            console.log(error);
          }
        } catch (error) {
          console.log(error);
        }
      }
      
      const fetchTasks = async () => {
        try {
          const result = await fetch(`${API_PREFIX}/tasks?status=IN_PROGRESS`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `${token}`,
            },
          });

          if (result.ok) {
            const data = await result.json();
            console.log(data);
            setTasks(data);
          } else {
            const error = await result.json();
            console.log(error);
          }
        } catch (error) {
          console.log(error);
        }
      }

      fetchGroups();
      fetchTasks();
    }
  }, []);

  return (
    <div className="homepage">
      <h1 className="homepage-title">Chore Core</h1>
      {!selectedGroupName ? (
        <>
          <GroupList groups={groups} onSelectGroup={setSelectedGroupName} />
          <ScrollableList title="Tasks" items={tasks} />
          <div style={{ textAlign: 'right', marginBottom: '10px' }}>
            <Link to="/mytasks" className="make-group-button">My Tasks</Link>
          </div>
          <ProgressList groups={groups} />
        </>
      ) : (
        <GroupPage group={selectedGroupName} onBack={() => setSelectedGroupName(null)} />
      )}
    </div>
  );
};

export default Homepage;
