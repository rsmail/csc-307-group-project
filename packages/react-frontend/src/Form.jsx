// src/Form.jsx
import React, { useState } from "react";

function Form(props) {
    const [person, setPerson] = useState({
        username: "",
        password: ""
    });

    function submitForm() {
        props.handleSubmit(person);
        setPerson({ username: "", password: "" });
    }

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "password")
            setPerson({
                username: person["username"],
                password: value
            });
        else
            setPerson({
                username: value,
                password: person["password"]
            });
    }

    return (
        <form>
            <label htmlFor="username">UserName</label>
            <input
                type="text"
                name="username"
                id="username"
                value={person.username}
                onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
                type="text"
                name="password"
                id="password"
                value={person.password}
                onChange={handleChange}
            />
            <input
                type="button"
                value="Submit"
                onClick={submitForm}
            />
        </form>
    );
}
export default Form;
