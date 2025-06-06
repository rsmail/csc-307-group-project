import React, { useState } from "react";
import "./MakeGroup.css"; // Import custom CSS
import { useNavigate } from "react-router-dom";

const MakeGroup = () => {
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] =
        useState("");
    
    const navigate = useNavigate();
    const API_PREFIX = import.meta.env.VITE_API_PREFIX;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            alert("You need to login first.");
            return;
        }

        const payload = {
            group_name: groupName,
            description: groupDescription
        };

        try {
            const response = await fetch(
                `${API_PREFIX}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                }
            );

            if (response.ok) {
                const data = await response.json();
                alert("Group created successfully!");
                setGroupName("");
                setGroupDescription("");
                console.log("Created group:", data);
            } else {
                const error = await response.json();
                alert(
                    "Failed to create group: " +
                        (error?.error || response.status)
                );
            }
        } catch (err) {
            console.error("Error creating group:", err);
            alert("Unexpected error while creating group.");
        }
    };

    return (
        <div className="makegroup-container">
            <button className="back-button" onClick={() => navigate(-1)}>&larr;</button>

            <div className="makegroup-box">
                <h1 className="makegroup-title">Chore Core</h1>
                <h2 className="makegroup-subtitle">
                    Create Group
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="makegroup-form">
                    <div>
                        <label>Group Name</label>
                        <input
                            type="text"
                            value={groupName}
                            onChange={(e) =>
                                setGroupName(e.target.value)
                            }
                            placeholder="Enter here"
                            required
                        />
                    </div>

                    <div>
                        <label>Group Description</label>
                        <input
                            type="text"
                            value={groupDescription}
                            onChange={(e) =>
                                setGroupDescription(
                                    e.target.value
                                )
                            }
                            placeholder="Enter here"
                        />
                    </div>

                    <button type="submit">Create Group</button>
                </form>
            </div>
        </div>
    );
};

export default MakeGroup;
