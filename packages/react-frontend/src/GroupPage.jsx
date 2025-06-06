import React from 'react';
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

  if (!selectedGroup) {
    return (
      <div className="group-page">
        <button className="back-button" onClick={onBack}>← Back to Homepage</button>
        <p>Group not found.</p>
      </div>
    );
  }

  return (
    <div className="group-page">
      <button className="back-button" onClick={onBack}>←</button>
      <GroupSection group={selectedGroup} />
    </div>
  );
};

export default GroupPage;
