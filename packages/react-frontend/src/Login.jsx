import React, { useState } from "react";

function Login(props) {
    const [creds, setCreds] = useState({
        email: "",
        password: ""
    });

    return (
        <form>
            <label htmlFor="email">Email</label>
            <input
                type="text"
                name="email"
                id="email"
                value={creds.email}
                onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                id="password"
                value={creds.password}
                onChange={handleChange}
            />
            <input
                type="button"
                value={props.buttonLabel || "Log In"}
                onClick={submitForm}
            />
        </form>
    );

    function handleChange(event) {
        const { name, value } = event.target;
        switch (name) {
            case "email":
                setCreds({ ...creds, email: value });
                break;
            case "password":
                setCreds({ ...creds, password: value });
                break;
        }
    }

    function submitForm() {
        props.handleSubmit(creds);
        setCreds({ email: "", password: "" });
    }
}
export default Login;
