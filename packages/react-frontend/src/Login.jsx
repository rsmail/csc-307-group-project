import React, { useState } from "react";

function Login(props) {
    const [creds, setCreds] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: ""
    });

    const isSignup = props.buttonLabel === "Sign Up";

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
            {isSignup && (
                <>
                    <label htmlFor="firstname">
                        {" "}
                        First Name
                    </label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        value={creds.firstname}
                        onChange={handleChange}
                    />
                    <label htmlFor="lastname">Last Name</label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        value={creds.lastname}
                        onChange={handleChange}
                    />
                </>
            )}
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
            case "firstname":
                setCreds({ ...creds, firstname: value });
                break;
            case "lastname":
                setCreds({ ...creds, lastname: value });
                break;
        }
    }

    function submitForm() {
        props.handleSubmit(creds);
        setCreds({
            email: "",
            password: "",
            firstname: "",
            lastname: ""
        });
    }
}
export default Login;
