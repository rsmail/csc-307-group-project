import React, { useState } from "react";
import "./MakeGroup.css"; 

const AssignTask = () => {
    const [name, setName] = useState("");
    const [deadline, setDeadline] = useState("");
    const [difficulty, setDifficulty] = useState(1);
    const [groupMemberId, setGroupMemberId] = useState("");
    const [status, setStatus] = useState("NOT_COMPLETED");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) return alert("Please login first.");

        const payload = {
            name,
            deadline,
            difficulty: parseInt(difficulty),
            group_member_id: parseInt(groupMemberId),
            status,
            approved_by: null 
        };

        console.log("Payload being sent:", payload);

        try {
            const res = await fetch(
                "http://localhost:8000/tasks",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                }
            );

            if (res.ok) {
                alert("Task created!");
                setName("");
                setDeadline("");
                setDifficulty(1);
                setGroupMemberId("");
                setStatus("NOT_COMPLETED");
            } else {
                const error = await res.json();
                alert("Error: " + (error?.error || res.status));
            }
        } catch (err) {
            console.error("Caught error:", err); // 👈 show error
            alert("Unexpected error.");
        }
    };

    return (
        <div className="makegroup-container">
            <button
                className="back-button"
                onClick={() => window.history.back()}>
                &larr;
            </button>

            <div className="makegroup-box">
                <h1 className="makegroup-title">Chore Core</h1>
                <h2 className="makegroup-subtitle">
                    Assign Task
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="makegroup-form">
                    <div>
                        <label>Task Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div>
                        <label>Group Member ID</label>
                        <input
                            type="number"
                            value={groupMemberId}
                            onChange={(e) =>
                                setGroupMemberId(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div>
                        <label>Deadline</label>
                        <input
                            type="date"
                            value={deadline}
                            onChange={(e) =>
                                setDeadline(e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <label>Difficulty (1-5)</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={difficulty}
                            onChange={(e) =>
                                setDifficulty(e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <label>Status</label>
                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value)
                            }>
                            <option value="NOT_COMPLETED">
                                Not Completed
                            </option>
                            <option value="COMPLETED">
                                Completed
                            </option>
                        </select>
                    </div>

                    <button type="submit">Assign Task</button>
                </form>
            </div>
        </div>
    );
};

export default AssignTask;
