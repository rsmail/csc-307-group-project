import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <h1>Chore Core</h1>
        <nav>
          <ul className="nav-links">
            <li>Group 1</li>
            <li>Group 2</li>
            <li>Group 3</li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="hero">
        <h2>Welcome to the Homepage</h2>
        <button>Learn More</button>
        
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} My Simple Website</p>
      </footer>
    </div>

    
  );
};
export default HomePage;

