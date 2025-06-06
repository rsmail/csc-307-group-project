import './Login.css';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API_PREFIX = import.meta.env.VITE_API_PREFIX;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_PREFIX}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password})
      });

      console.log(JSON.stringify({email, password}));

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong logging you in.")
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Chore Core</h1>
        <h2 className="login-subtitle">Sign in</h2>
        <p className="login-subtext">Enter your email and password to sign in</p>

        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            name="email"
            placeholder="email@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Continue</button>
          <button type="button" onClick={() => navigate("/register")}>
            Create an account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
