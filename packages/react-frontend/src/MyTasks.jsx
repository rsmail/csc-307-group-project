import React, { useEffect, useState } from 'react';
import './HomePage.css';

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('https://chorecore-api-f2b2esdrg4g6exfy.westus3-01.azurewebsites.net/mytasks')
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch tasks'))
      .then(data => setTasks(data.tasks || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="homepage">
      <h1 className="homepage-title">My Tasks</h1>
      <div className="list-container">
        {tasks.length > 0 ? (
          <ul className="task-list">
            {tasks.map((task, index) => (
              <li key={index} className="task-item">
                <div className="task-title">{task.title}</div>
                <div className="task-meta">
                  Group: <strong>{task.group}</strong> | Due: <strong>{task.dueDate}</strong>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks assigned.</p>
        )}
      </div>
    </div>
  );
};

export default MyTasks;
