import "./SignUp.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp(props) {
    const [creds, setCreds] = useState({
        email: "",
        pwd: "",
        confirmpwd: "",
        firstname: "",
        lastname: ""
    });
    const navigate = useNavigate();
    const API_PREFIX = import.meta.env.VITE_API_PREFIX;

    function handleChange(event) {
        const { name, value } = event.target;
        setCreds((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    async function submitForm(e) {
        e.preventDefault();

        if (creds.pwd !== creds.confirmpwd) {
            alert("Passwords do not match.");
            return;
        }

        const payload = {
            email: creds.email,
            password: creds.pwd,
            firstname: creds.firstname,
            lastname: creds.lastname
        };

        try {
            const response = await fetch(`${API_PREFIX}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                navigate("/home");
            } else {
                alert("Invalid email or password");
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong.");
        }
    }

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h1 className="signup-title">Chore Core</h1>
                <h2 className="signup-subtitle">
                    Create an account
                </h2>
                <form
                    className="signup-form"
                    onSubmit={submitForm}>
                    <p className="signup-subtext">
                        Enter your information to sign up
                    </p>

                    <input
                        type="text"
                        name="email"
                        placeholder="email@domain.com"
                        value={creds.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="pwd"
                        placeholder="Password"
                        value={creds.pwd}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="confirmpwd"
                        placeholder="Confirm Password"
                        value={creds.confirmpwd}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="firstname"
                        placeholder="First Name (optional)"
                        value={creds.firstname}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Last Name (optional)"
                        value={creds.lastname}
                        onChange={handleChange}
                    />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;