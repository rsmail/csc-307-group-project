import React, { useEffect, useState } from 'react';
import './MyTasks.css';
import { useNavigate } from 'react-router-dom';

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const API_PREFIX = import.meta.env.VITE_API_PREFIX;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
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
            console.log(data);

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

  const toggleCompletion = async (task_id) => {
    const token = localStorage.getItem("token");

    try {
      console.log(task_id);
      const result = await fetch(`${API_PREFIX}/tasks/${task_id}`, {
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
      } else {
        // Remove the task
        setTasks((prevTasks) => prevTasks.filter(t => t.task_id !== task_id));
      }
    } catch (error) {
      console.log('Error updating task:', error);
    }
  };

  return (
    <div className="MyTask">
      <button className="back-button" onClick={() => navigate(-1)}>&larr;</button>
      <h1 className="MyTask-title">My Tasks</h1>
      <div className="list-container">
        {tasks.length > 0 ? (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.task_id} className={`task-item ${task.status ? 'completed' : ''}`}>
                <div className="task-header">
                  <label className="task-checkbox">
                    <input
                      type="checkbox"
                      checked={task.status === "COMPLETED"}
                      onChange={() => toggleCompletion(task.task_id)}
                    />
                  </label>
                  <span className="checkbox-label">{task.name}</span>
                </div>
                <div className="task-meta">
                  Group: <strong>{task.group_name}</strong> | Due: <strong>{task.deadline}</strong>
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
