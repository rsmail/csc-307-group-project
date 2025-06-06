import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

const groups = [
  { name: 'Group A', completedTasks: 3, totalTasks: 5 },
  { name: 'Group B', completedTasks: 2, totalTasks: 4 },
  { name: 'Group C', completedTasks: 5, totalTasks: 5 },
  { name: 'Group D', completedTasks: 1, totalTasks: 3 },
  { name: 'Group E', completedTasks: 0, totalTasks: 2 }
];

const tasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];

const ProgressBar = ({ completed, total }) => {
  const percent = Math.round((completed / total) * 100);
  return (
    <div className="progress-bar-wrapper">
      <div className="progress-bar-background">
        <div
          className="progress-bar-fill"
          style={{ width: `${percent}%`, backgroundColor: percent === 100 ? '#4caf50' : '#2196f3' }}
        ></div>
      </div>
      <div className="progress-label">{percent}%</div>
    </div>
  );
};

const GroupList = ({ groups, onSelectGroup }) => (
  <div className="list-container">
    <div className="list-header">
      <h2 className="list-title">Groups</h2>
      <Link to="/MakeGroup" className="make-group-button">+ New Group</Link>
    </div>
    <div className="scroll-wrapper">
      <div className="scroll-gradient left" />
      <div className="scroll-gradient right" />
      <div className="scroll-content">
        {groups.map((group, index) => (
          <div key={index} className="scroll-item clickable" onClick={() => onSelectGroup(group)}>
            <div>{group.name}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TaskList = ({ tasks }) => (
  <div className="list-container">
    <div className="list-header">
      <h2 className="list-title">Tasks</h2>
      <Link to="/AssignTask" className="make-group-button">+ New Task</Link>
    </div>
    <div className="scroll-wrapper">
      <div className="scroll-gradient left" />
      <div className="scroll-gradient right" />
      <div className="scroll-content">
        {tasks.map((task, index) => (
          <div key={index} className="scroll-item">
            {task}
          </div>
        ))}
      </div>
    </div>
  </div>
);


const ProgressList = ({ groups }) => (
  <div className="list-container">
    <h2 className="list-title">Progress</h2>
    <div className="vertical-scroll-wrapper">
      {groups.map((group, index) => (
        <div key={index} className="progress-item">
          <div className="progress-group-name">{group.name}</div>
          <ProgressBar completed={group.completedTasks} total={group.totalTasks} />
        </div>
      ))}
    </div>
  </div>
);

const ScrollableList = ({ title, items }) => (
  <div className="list-container">
    <h2 className="list-title">{title}</h2>
    <div className="scroll-wrapper">
      <div className="scroll-gradient left" />
      <div className="scroll-gradient right" />
      <div className="scroll-content">
        {items.map((item, index) => (
          <div key={index} className="scroll-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const GroupDetails = ({ group, onBack }) => (
  <div className="group-details">
    <button className="back-button" onClick={onBack}>← Back to Homepage</button>
    <h2 className="group-title">{group.name}</h2>
    <ul className="task-list">
      {Array.from({ length: group.totalTasks }).map((_, index) => (
        <li key={index} className="task-item">Task {index + 1}</li>
      ))}
    </ul>
  </div>
);

const Homepage = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  return (
    <div className="homepage">
      <h1 className="homepage-title">Chore Core</h1>
      {!selectedGroup ? (
        <>
          <GroupList groups={groups} onSelectGroup={setSelectedGroup} />
          <TaskList tasks={tasks} />
          <ProgressList groups={groups} />
        </>
      ) : (
        <GroupDetails group={selectedGroup} onBack={() => setSelectedGroup(null)} />
      )}
    </div>
  );
};

export default Homepage;
