import React, { useState } from 'react';
import './GroupPage.css';

const groupData = [
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
      {group.tasks.map((task, index) => (
        <TaskItem key={index} task={task} />
      ))}
    </div>
  </div>
);

const GroupList = ({ onSelect }) => (
  <div className="group-page">
    <h1 className="page-title">Choose a Group</h1>
    <div className="group-selection">
      {groupData.map((group, index) => (
        <div
          key={index}
          className="group-card"
          onClick={() => onSelect(group)}
        >
          {group.name}
        </div>
      ))}
    </div>
  </div>
);

const GroupPage = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  return (
    <div className="group-page">
      {!selectedGroup ? (
        <GroupList onSelect={setSelectedGroup} />
      ) : (
        <>
          <button className="back-button" onClick={() => setSelectedGroup(null)}>
            ← Back to Groups
          </button>
          <GroupSection group={selectedGroup} />
        </>
      )}
    </div>
  );
};

export default GroupPage;
