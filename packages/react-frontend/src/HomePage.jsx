import React from 'react';
import './Homepage.css';

const groups = ['Group A', 'Group B', 'Group C', 'Group D', 'Group E'];
const tasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];

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
      <h1 className="homepage-title">Welcome to the Homepage</h1>
      <ScrollableList title="Groups" items={groups} />
      <ScrollableList title="Tasks" items={tasks} />
    </div>
  );
};

export default Homepage;