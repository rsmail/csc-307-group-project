import './SignUp.css';
import React, { useState } from "react";

function SignUp(props) {
  const [creds, setCreds] = useState({
    username: "",
    pwd: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setCreds((prev) => ({
      ...prev,
      [name === "username" ? "username" : "pwd"]: value,
    }));
  }

  function submitForm(e) {
    e.preventDefault();
    props.handleSubmit(creds);
    setCreds({ username: "", pwd: "" });
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Chore Core</h1>
        <h2 className="login-subtitle">Create and account</h2>
        <p className="login-subtext">Enter your email to sign up for this app</p>

        <form className="login-form" onSubmit={submitForm}>
          <input
            type="text"
            name="username"
            placeholder="email@domain.com"
            value={creds.username}
            onChange={handleChange}
          />
          
          <button type="submit">Continue</button>
          
        </form>
      </div>
    </div>
  );
}

export default SignUp;
