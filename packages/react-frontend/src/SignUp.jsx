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
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="signup-title">Chore Core</h1>
        <h2 className="signup-subtitle">Create an account</h2>
        <p className="signup-subtext">Enter your email to sign up for this app</p>

        <form className="signup-form" onSubmit={submitForm}>
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
