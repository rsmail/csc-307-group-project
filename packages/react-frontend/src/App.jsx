import React, { useState, useEffect } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import MakeGroup from "./MakeGroup";
import Homepage from "./HomePage"; 
import MakeTask from "./MakeTask";
import GroupMembers from "./GroupMembers";
import MyTasks from "./MyTasks";
import GroupPage from "./GroupPage";
import Navbar from "./Navbar";
// import { getUserIdFromToken } from "./utils/decodeToken";


import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useNavigate,
} from "react-router-dom";

function AppContent() {
    const [token, setToken] = useState(() => localStorage.getItem("token") || null);
    const [message, setMessage] = useState("");
    const API_PREFIX = import.meta.env.VITE_API_PREFIX;
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
    }

    async function loginUser(creds) {
        try {
            const result = await fetch(`${API_PREFIX}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: creds.email,
                    password: creds.pwd
                })
            });

            if (result.ok) {
                const data = await result.json();
                localStorage.setItem("token", data.token);
                setToken(data.token);
                setMessage("Login successful.");
                navigate("/home");
            } else {
                const error = await result.json();
                setMessage(`Login Error ${error}`);
            }
        } catch (error) {
            console.log(error);
            setMessage(error);
        }
        
    }

    async function signupUser(creds) {
        try {
            const result = await fetch(`${API_PREFIX}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(creds)
            })

            if (result.ok) {
                const data = await result.json();
                localStorage.setItem("token", data.token);
                setToken(data.token);
                setMessage("Signup successful");
                navigate("/home");
            } else {
                setMessage("An account with this email already exists.");
            }
        } catch (error) {
            console.log(error);
            setMessage(error);
        }
    }

    return (
        <div className="container">
            <Navbar token={token} handleLogout={handleLogout}/>
            
            <p>{message}</p>

            <Routes>
                <Route path="/login" element={<Login handleSubmit={loginUser} />} />
                <Route path="/signup" element={<SignUp handleSubmit={signupUser} />} />
                <Route path="/home" element={<Homepage />} />
                <Route path="/makegroup" element={<MakeGroup />} />
                <Route path="/groups/:id/newTask" element={<MakeTask />} />
                <Route path="/groups/:id/members" element={<GroupMembers />} />
                <Route path="/mytasks" element={<MyTasks />} />
                <Route path="/groups/:id" element={<GroupPage />} />
                
               {/* A default route for the initial load */}
                <Route path="*" element={token ? <Navigate to="/home" /> : <Navigate to="/login" />} />
            </Routes>
        </div>
    )
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;
