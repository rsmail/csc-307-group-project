import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <h1>My Simple Website</h1>
        <nav>
          <ul className="nav-links">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="hero">
        <h2>Welcome to the Homepage</h2>
        <p>This is a basic homepage built using React and CSS.</p>
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
