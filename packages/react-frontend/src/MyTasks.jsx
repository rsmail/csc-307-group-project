import React, { useEffect, useState } from 'react';
import './HomePage.css';

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // For now, fill with fake tasks
    setTasks([
      { title: 'Clean kitchen', group: 'Group A', dueDate: '2025-06-10' },
      { title: 'Do laundry', group: 'Group B', dueDate: '2025-06-11' },
      { title: 'Take out trash', group: 'Group C', dueDate: '2025-06-12' },
      { title: 'Vacuum living room', group: 'Group D', dueDate: '2025-06-13' }
    ]);
  }, []);

  return (
    <div className="MyTask">
      <h1 className="MyTask-title">My Tasks</h1>
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
