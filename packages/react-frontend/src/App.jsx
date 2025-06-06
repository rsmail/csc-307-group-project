import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import Login from "./Login";
import SignUp from "./SignUp";
import MakeGroup from "./MakeGroup";
import Homepage from "./HomePage"; 
import MakeTask from "./MakeTask";
import GroupMembers from "./GroupMembers";
import MyTasks from "./MyTasks";
import GroupPage from "./GroupPage";
import { getUserIdFromToken } from "./utils/decodeToken";


import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Navigate
} from "react-router-dom";

function App() {
    const [characters, setCharacters] = useState([]);
    const INVALID_TOKEN = "INVALID_TOKEN";
    const [token, setToken] = useState(() => localStorage.getItem("token") || INVALID_TOKEN);
    const [message, setMessage] = useState("");
    const API_PREFIX = import.meta.env.VITE_API_PREFIX;

    function loginUser(creds) {
        const promise = fetch(`${API_PREFIX}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: creds.email,
                password: creds.pwd
            })
        })
        .then((response) => {
            if (response.status === 200) {
              response.json().then((payload) => {
                setToken(payload.token);
                localStorage.setItem("token", payload.token);
                
                const userId = getUserIdFromToken(payload.token); // 👈 move here
                console.log("Logged in as user_id:", userId);
          
                setMessage(`Login successful; auth token saved`);
                window.location.href = "/";
              });
            } else {
              setMessage(`Login Error ${response.status}: ${response.data}`);
            }
          })
          
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
                        "An account with this email already exists."
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
        const storedToken = localStorage.getItem("token");
        if (storedToken) setToken(storedToken);
    }, []);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) setToken(storedToken);
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
                    <Link to="/home">Home</Link> |{" "}
                    <Link to="/login">Login</Link> |{" "}
                    <Link to="/signup">Signup</Link>
                </nav>
                <p>{message}</p>

                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route
                        path="/table"
                        element={
                            <Table
                                characters={characters}
                                removeOneCharacter={
                                    removeOneCharacter
                                }
                            />
                        }
                    />
                    <Route path="/home" element={<Homepage />} />
                    <Route path="/login" element={<Login handleSubmit={loginUser} />} />
                    <Route path="/signup" element={<SignUp handleSubmit={signupUser} buttonLabel="Sign Up" />} />
                    <Route path="/makegroup" element={<MakeGroup token={token} />} />
                    <Route path="/maketask" element={<MakeTask />} />
                    <Route path="/groups/:groupName/members" element={<GroupMembers />} />
                    <Route path="/mytasks" element={<MyTasks />} />
                    <Route path="/groups/:id" element={<GroupPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
