import React from 'react';
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
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <div className="progress-label">{percent}%</div>
    </div>
  );
};

const GroupList = ({ groups }) => (
  <div className="list-container">
    <h2 className="list-title">Groups</h2>
    <div className="scroll-wrapper">
      <div className="scroll-gradient left" />
      <div className="scroll-gradient right" />
      <div className="scroll-content">
        {groups.map((group, index) => (
          <div key={index} className="scroll-item">
            <div>{group.name}</div>
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

const Homepage = () => {
  return (
    <div className="homepage">
      <h1 className="homepage-title">Chore Core</h1>
      <GroupList groups={groups} />
      <ScrollableList title="Tasks" items={tasks} />
      <ProgressList groups={groups} />
    </div>
  );
};

export default Homepage;
