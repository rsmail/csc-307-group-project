import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GroupPage.css';

export const groupData = [
  {
    name: 'Group A',
    tasks: [
      { title: 'Clean kitchen', assignedTo: 'Alice', dueDate: '2025-05-28' },
      { title: 'Vacuum living room', assignedTo: 'Bob', dueDate: '2025-05-29' }
    ]
  },
  {
    name: 'Group B',
    tasks: [
      { title: 'Laundry', assignedTo: 'Carol', dueDate: '2025-05-27' },
      { title: 'Grocery shopping', assignedTo: 'Dave', dueDate: '2025-05-30' }
    ]
  },
  {
    name: 'Group C',
    tasks: [
      { title: 'Mow lawn', assignedTo: 'Eve', dueDate: '2025-05-26' },
      { title: 'Wash car', assignedTo: 'Frank', dueDate: '2025-05-28' }
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

const TaskItem = ({ task }) => (
  <div className="task-item">
    <div className="task-title">{task.title}</div>
    <div className="task-meta">
      Assigned to: <strong>{task.assignedTo}</strong> | Due: <strong>{task.dueDate}</strong>
    </div>
  </div>
);

const GroupSection = ({ group }) => (
  <div className="group-section">
    <h2 className="group-title">{group.name}</h2>
    <div className="task-list">
      {group.tasks.length > 0 ? (
        group.tasks.map((task, index) => (
          <TaskItem key={index} task={task} />
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
      <button className="create-task-button" onClick={() => navigate('/MakeTask')}>
        + Create New Task
      </button>
    </div>
  );
};

export default GroupPage;
