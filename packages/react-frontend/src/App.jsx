import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import Login from "./Login";
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

function MyApp() {
    const [characters, setCharacters] = useState([]);
    const INVALID_TOKEN = "INVALID_TOKEN";
    const [token, setToken] = useState(INVALID_TOKEN);
    const [message, setMessage] = useState("");
    const API_PREFIX = "http://localhost:8000";

    function loginUser(creds) {
        const promise = fetch(`${API_PREFIX}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: creds.email,
                password: creds.password
            })
        })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((payload) => {
                        setToken(payload.token);
                        setMessage(
                            `Login successful; auth token saved`
                        );
                    });
                } else {
                    setMessage(
                        `Login Error ${response.status}: ${response.data}`
                    );
                }
            })
            .catch((error) => {
                setMessage(`Login Error: ${error}`);
            });

        return promise;
    }

    function signupUser(creds) {
        const promise = fetch(`${API_PREFIX}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(creds)
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then((payload) => {
                        setToken(payload.token);
                        setMessage(
                            `Signup successful for user: ${creds.email}; auth token saved`
                        );
                    });
                } else {
                    setMessage(
                        `Signup Error ${response.status}: ${response.data}`
                    );
                }
            })
            .catch((error) => {
                setMessage(`Signup Error: ${error}`);
            });

        return promise;
    }

    function updateList(person) {
        postUser(person)
            .then((res) => {
                if (res.status === 201) {
                    return res.json();
                }
            })
            .then((updatedPerson) => {
                setCharacters([...characters, updatedPerson]);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function removeOneCharacter(index) {
        fetch(`${API_PREFIX}/users/${characters[index]._id}`, {
            method: "DELETE",
            headers: addAuthHeader()
        })
            .then((res) => {
                if (res.status === 204) {
                    const updated = characters.filter(
                        (character, i) => {
                            return i !== index;
                        }
                    );
                    setCharacters(updated);
                }
            })
            .catch((error) => {
                console.error(console.log(error));
            });
    }

    function fetchUsers() {
        return fetch(`${API_PREFIX}/users`, {
            headers: addAuthHeader()
        });
    }

    function addAuthHeader(otherHeaders = {}) {
        if (token === INVALID_TOKEN) {
            return otherHeaders;
        } else {
            return {
                ...otherHeaders,
                Authorization: `Bearer ${token}`
            };
        }
    }

    useEffect(() => {
        setToken(INVALID_TOKEN);
        fetchUsers()
            .then((res) =>
                res.status === 200 ? res.json() : undefined
            )
            .then((json) => {
                if (json) {
                    setCharacters(json["users_list"]);
                } else {
                    setCharacters(null);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function postUser(person) {
        console.log(JSON.stringify(person));
        const promise = fetch(`${API_PREFIX}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(person)
        });

        return promise;
    }

    return (
        <BrowserRouter>
            <div className="container">
                <nav>
                    <Link to="/">Home</Link> |{" "}
                    <Link to="/login">Login</Link> |{" "}
                    <Link to="/signup">Signup</Link>
                </nav>
                <p>{message}</p>

                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Table
                                    characterData={characters}
                                    removeCharacter={
                                        removeOneCharacter
                                    }
                                />
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <Login handleSubmit={loginUser} />
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <Login
                                handleSubmit={signupUser}
                                buttonLabel="Sign Up"
                            />
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
export default MyApp;
