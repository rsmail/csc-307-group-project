import './Login.css';
import React, { useState } from "react";

function Login(props) {
    const [creds, setCreds] = useState({
        email: "",
        password: "",
        confirmpassword: "",
        firstname: "",
        lastname: ""
    });

  function handleChange(event) {
    const { name, value } = event.target;
    setCreds((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function submitForm(e) {
    e.preventDefault();
    props.handleSubmit(creds);
    setCreds({ email: "", password: "" });
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Chore Core</h1>
        <h2 className="login-subtitle">Sign in</h2>
        <p className="login-subtext">Enter your email and password to sign in</p>

        <form className="login-form" onSubmit={submitForm}>
          <input
            type="text"
            name="email"
            placeholder="email@domain.com"
            value={creds.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={creds.password}
            onChange={handleChange}
          />
          <button type="submit">Continue</button>
          <button type="button" onClick={() => window.location.href = "/signup"}>
            Create an account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
