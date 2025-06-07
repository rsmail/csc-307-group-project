import React, { useEffect, useState } from 'react';
import './MyTasks.css';

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const API_PREFIX = import.meta.env.VITE_API_PREFIX;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
    } else {
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
            const withCompletion = data
              .map(task => ({ ...task, completed: task.status === 'COMPLETED' }))
              .filter(task => !task.completed);
            setTasks(withCompletion);
          } else {
            const error = await result.json();
            console.log(error);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchTasks();
    }
  }, []);

  const toggleCompletion = async (index) => {
    const updatedTasks = [...tasks];
    const task = updatedTasks[index];
    task.completed = !task.completed;
    setTasks(updatedTasks.filter(t => !t.completed));

    const token = localStorage.getItem("token");

    try {
      const result = await fetch(`${API_PREFIX}/tasks/${task.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`,
        },
        body: JSON.stringify({ status: 'APPROVAL_NEEDED' }),
      });

      if (!result.ok) {
        const error = await result.json();
        console.log('Failed to update task status:', error);
      }
    } catch (error) {
      console.log('Error updating task:', error);
    }
  };

  return (
    <div className="MyTask">
      <h1 className="MyTask-title">My Tasks</h1>
      <div className="list-container">
        {tasks.length > 0 ? (
          <ul className="task-list">
            {tasks.map((task, index) => (
              <li key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <label className="task-checkbox">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleCompletion(index)}
                  />
                  <span className="checkbox-label">{task.name}</span>
                </label>
                <div className="task-meta">
                  Group: <strong>{task.groupName}</strong> | Due: <strong>{task.deadline}</strong>
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
