import React from 'react';
import { Link } from 'react-router-dom'; // Or NavLink if you want active styles
import './Navbar.css'; // Make sure to import the CSS file!

function Navbar({ token, handleLogout }) {
  return (
    <nav className="navbar">

      <Link to="/home" className="navbar-brand">Chore Core</Link>

      <div className="navbar-links">
        {token ? (
          // --- Logged-in Links
          <>
          <Link to="/MyTasks">My Tasks</Link>
          
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
          </>
        ) : (
          // --- Logged-out Links
          <>
            <Link to="/home">Home</Link>
            <Link to="login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;