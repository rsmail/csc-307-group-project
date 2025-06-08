import React, { useEffect, useState } from "react";
import './MakeTask.css';
import { useNavigate, useParams } from "react-router-dom";

const MakeTask = () => {
  const [task, setTask] = useState({
    title: "",
    assignedTo: "",
    dueDate: ""
  });

  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const API_PREFIX = import.meta.env.VITE_API_PREFIX;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchGroupMembers = async () => {
      try {
        const result = await fetch(`${API_PREFIX}/groups/${id}`, {
          headers: {
            "Content-Type" : "application/json",
            "Authorization": `${token}`,
          },
        });

        if (result.ok) {
          const data = await result.json();
          console.log(data);
          setMembers(data);
        } else {
          const error = await result.json();
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchGroupMembers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: name === "assignedTo" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Task submitted:", task);
    
    const token = localStorage.getItem("token");

    try {
      const result = await fetch(`${API_PREFIX}/groups/${id}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`,
        },
        body: JSON.stringify(task),
      });

      if (result.ok) {
        console.log("Task created.");
        navigate(-1);
      } else {
        const error = await result.json();
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      alert(`An error has occurred: ${error}`);
    }
  };

  return (
    
    <div className="make-task">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <button className="back-button" onClick={() => navigate(-1)}> &larr;</button>
      </div>

      <h2>Create a New Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
      <div>
        <label>Assign To:</label>
        <select
          name="assignedTo"
          value={task.assignedTo}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Member --</option>
          {members.map((member) => (
            <option key={member.group_member_id} value={member.group_member_id}>
              {member.firstname} {member.lastname}
            </option>
          ))}
        </select>
    </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default MakeTask;
