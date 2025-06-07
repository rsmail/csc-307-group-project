import React, { useEffect, useState } from 'react';
import './MyTasks.css';

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Initial fake tasks with a "completed" field
    setTasks([
      { title: 'Clean kitchen', group: 'Group A', dueDate: '2025-06-10', completed: false },
      { title: 'Do laundry', group: 'Group B', dueDate: '2025-06-11', completed: false },
      { title: 'Take out trash', group: 'Group C', dueDate: '2025-06-12', completed: false },
      { title: 'Vacuum living room', group: 'Group D', dueDate: '2025-06-13', completed: false }
    ]);
  }, []);

  const toggleCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="MyTask">
      <h1 className="MyTask-title">My Tasks</h1>
      <div className="list-container">
        {tasks.length > 0 ? (
          <ul className="task-list">
            {tasks.map((task, index) => (
              <li
                key={index}
                className={`task-item ${task.completed ? 'completed' : ''}`}
              >
                <label className="task-checkbox">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleCompletion(index)}
                  />
                  <span className="checkbox-label">{task.title}</span>
                </label>
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