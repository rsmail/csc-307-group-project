import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './GroupPage.css';

const TaskItem = ({ task }) => {
  const API_PREFIX = import.meta.env.VITE_API_PREFIX;
  const [completed, setCompleted] = useState(task.status);

  const handleCheckboxChange = async () => {
    const updated = !completed; 
    setCompleted(updated);

    try {
      const response = await fetch(`${API_PREFIX}/tasks/${task.task_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: updated })
      });

      if (!response.ok) {
        throw new Error(`Failed to update task status`);
      }
    } catch (error) {
      alert(`Error updating task: ${error.message}`);
      setCompleted(!updated); // Revert on failure
    }
  };

  return (
    <div className="task-item">
      <div className="task-title">
        <input
          type="checkbox"
          checked={completed}
          onChange={handleCheckboxChange}
          style={{ marginRight: '10px' }}
        />
        {task.task_name}
      </div>
      <div className="task-meta">
        Assigned to: <strong>{task.user_name}</strong> | Due: <strong>{task.deadline}</strong>
      </div>
    </div>
  );
};

const GroupSection = ({ group, tasks }) => (
  <div className="group-section">
    <h2 className="group-title">{group.group_name}</h2>
    <div className="task-list">
      {tasks && tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem key={task.task_id} task={task} />
        ))
      ) : (
        <p>No tasks assigned to this group.</p>
      )}
    </div>
  </div>
);

const GroupPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [group_members, setGroup] = useState(null);
  const [group_info, setGroupInfo] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [showPopup, setShowPopup] = useState(false);
  const [newMember, setNewMember] = useState("");

  const API_PREFIX = import.meta.env.VITE_API_PREFIX;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchGroupData = async () => {
      try {
        setLoading(true); // Reset loading state on new fetch
        const result = await fetch(`${API_PREFIX}/groups/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`,
          },
        });

        if (result.ok) {
          const data = await result.json();
          setGroup(data);
        } else {
          const errorData = await result.json();
          setError(errorData.message || 'Failed to fetch group data.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchGroupTasks = async () => {
      try {
        setLoading(true);
        const result = await fetch(`${API_PREFIX}/groups/${id}/tasks?status=IN_PROGRESS`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`,
          },
        });

        if (result.ok) {
          const data = await result.json();
          setTasks(data);
        } else {
          const error = await result.json();
          setError(error.message || "Failed to fetch group data");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    const fetchGroupInfo = async () => {
      try {
        setLoading(true);
        const result = await fetch(`${API_PREFIX}/groups/${id}/info`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`,
          },
        });

        if (result.ok) {
          const data = await result.json();
          setGroupInfo(data[0]);
        } else {
          const error = await result.json();
          setError(error);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchGroupData();
    fetchGroupTasks();
    fetchGroupInfo();
  }, [id, navigate, API_PREFIX]);

  const handleAddMember = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    if (!newMember.trim() || !group_members) return;

    try {
        const response = await fetch(`${API_PREFIX}/groups/${id}/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
            body: JSON.stringify({ email: newMember })
        });

        if (response.ok) {
            alert(`Invited ${newMember} to ${group_info.group_name}`);
            setNewMember("");
            setShowPopup(false);
        } else {
            const errorText = await response.text();
            alert(`Failed to add member: ${errorText}`);
        }
    } catch (err) {
        alert(`Error adding member: ${err.message}`);
    }
  };

  if (loading) {
    return <div className="group-page"><p>Loading group...</p></div>;
  }
  
  if (error) {
    return <div className="group-page"><p>Error: {error}</p></div>;
  }
  
  if (!group_members) {
    return (
      <div className="group-page">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <p>Group not found.</p>
      </div>
    );
  }

  return (
    <div className="group-page">
      <button className="back-button" onClick={() => navigate(-1)}>←</button>
      <GroupSection group={group_info} tasks={tasks} />
      <button className="create-task-button" onClick={() => navigate('/maketask')}>
        + Create New Task
      </button>
      <button className="add-member-button" onClick={() => setShowPopup(true)}>
        + Add Group Member
      </button>
      <button className="view-members-button" onClick={() => navigate(`/groups/${group_members.id}/members`)}>
        View Members
      </button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Invite New Member</h3>
            <input
              type="text"
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
              placeholder="Enter user email"
            />
            <div className="popup-buttons">
              <button onClick={handleAddMember}>Invite</button>
              <button onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupPage;