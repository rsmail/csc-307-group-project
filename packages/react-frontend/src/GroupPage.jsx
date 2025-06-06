import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GroupPage.css';

export const groupData = [
  {
    name: 'Group A',
    tasks: [
      { title: 'Clean kitchen', assignedTo: 'Alice', dueDate: '2025-05-28', completed: false },
      { title: 'Vacuum living room', assignedTo: 'Bob', dueDate: '2025-05-29', completed: false }
    ]
  },
  {
    name: 'Group B',
    tasks: [
      { title: 'Laundry', assignedTo: 'Carol', dueDate: '2025-05-27', completed: false },
      { title: 'Grocery shopping', assignedTo: 'Dave', dueDate: '2025-05-30', completed: false }
    ]
  },
  {
    name: 'Group C',
    tasks: [
      { title: 'Mow lawn', assignedTo: 'Eve', dueDate: '2025-05-26', completed: false },
      { title: 'Wash car', assignedTo: 'Frank', dueDate: '2025-05-28', completed: false }
    ]
  },
  {
    name: 'Group D',
    tasks: []
  },
  {
    name: 'Group E',
    tasks: []
  }
];

const TaskItem = ({ task, groupName }) => {
  const [completed, setCompleted] = useState(task.completed);

  const handleCheckboxChange = async () => {
    const updated = !completed;
    setCompleted(updated);

    try {
      const response = await fetch(`https://chorecore-api-f2b2esdrg4g6exfy.westus3-01.azurewebsites.net/groups/${groupName}/tasks/${task.title}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: updated })
      });

      if (!response.ok) {
        throw new Error(`Failed to update task status`);
      }
    } catch (error) {
      alert(`Error updating task: ${error.message}`);
      setCompleted(!updated); // rollback on failure
    }
  };

  return (
    <div className="task-item">
      <div className="task-title">
        <input
          type="checkbox"
          checked={completed}
          onChange={handleCheckboxChange}
          style={{ marginRight: '10px' }}
        />
        {task.title}
      </div>
      <div className="task-meta">
        Assigned to: <strong>{task.assignedTo}</strong> | Due: <strong>{task.dueDate}</strong>
      </div>
    </div>
  );
};

const GroupSection = ({ group }) => (
  <div className="group-section">
    <h2 className="group-title">{group.name}</h2>
    <div className="task-list">
      {group.tasks.length > 0 ? (
        group.tasks.map((task, index) => (
          <TaskItem key={index} task={task} groupName={group.name} />
        ))
      ) : (
        <p>No tasks assigned.</p>
      )}
    </div>
  </div>
);

const GroupPage = ({ group, onBack }) => {
  const selectedGroup = groupData.find(g => g.name === group);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [newMember, setNewMember] = useState("");

  const handleAddMember = async () => {
    if (!newMember.trim()) return;

    try {
      const response = await fetch(`https://chorecore-api-f2b2esdrg4g6exfy.westus3-01.azurewebsites.net/groups/${selectedGroup.name}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newMember })
      });

      if (response.ok) {
        alert(`Added ${newMember} to ${selectedGroup.name}`);
        setNewMember("");
        setShowPopup(false);
      } else {
        const errorText = await response.text();
        alert(`Failed to add member: ${errorText}`);
      }
    } catch (error) {
      alert(`Error adding member: ${error.message}`);
    }
  };

  if (!selectedGroup) {
    return (
      <div className="group-page">
        <button className="back-button" onClick={onBack}>←</button>
        <p>Group not found.</p>
      </div>
    );
  }

  return (
    <div className="group-page">
      <button className="back-button" onClick={onBack}>←</button>
      <GroupSection group={selectedGroup} />
      <button className="create-task-button" onClick={() => navigate('/maketask')}>
        + Create New Task
      </button>
      <button className="add-member-button" onClick={() => setShowPopup(true)}>
        + Add Group Member
      </button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Add New Member</h3>
            <input
              type="text"
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
              placeholder="Enter member name"
            />
            <div className="popup-buttons">
              <button onClick={handleAddMember}>Add</button>
              <button onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupPage;
