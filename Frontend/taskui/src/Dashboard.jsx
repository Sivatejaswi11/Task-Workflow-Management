import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [search, setSearch] = useState("");
    const [priority, setPriority] = useState("High");
    const [assignedTo, setAssignedTo] = useState("");

    // 🔥 NEW STATE FOR EDIT
    const [editId, setEditId] = useState(null);

    async function loadTasks() {

        try {

            const response = await fetch(
                "http://localhost:8002/task"
            );

            const data = await response.json();

            setTasks(data);

        }

        catch (error) {
            console.log(error);
        }

    }

    // 🔥 ADD + UPDATE TOGETHER
    async function addTask() {

        const payload = {
            title,
            description,
            priority,
            status: "Pending",
            assignedTo: assignedTo.trim().toLowerCase()
        };

        // UPDATE MODE
        if (editId) {

            await fetch(
                `http://localhost:8002/task/${editId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                }
            );

            setEditId(null);

        } else {

            // CREATE MODE
            await fetch(
                "http://localhost:8002/task/createtask",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                }

            );

            await fetch(
                "http://localhost:8081/tasks/createtask",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                }

            );

        }

        setTitle("");
        setDescription("");
        setPriority("High");
        setAssignedTo("");

        loadTasks();
    }

    async function deleteTask(id) {

        await fetch(
            `http://localhost:8002/task/${id}`,
            {
                method: "DELETE"
            }
        );

        loadTasks();
    }

    async function completeTask(id) {

        await fetch(
            `http://localhost:8002/task/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: "Completed"
                })
            }
        );

        loadTasks();
    }

    async function progressTask(id) {

        await fetch(
            `http://localhost:8002/task/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: "InProgress"
                })
            }
        );

        loadTasks();
    }

    // 🔥 EDIT CLICK FUNCTION
    function handleEdit(task) {
        setEditId(task._id);
        setTitle(task.title);
        setDescription(task.description);
        setPriority(task.priority);
        setAssignedTo(task.assignedTo);
    }

    useEffect(() => {
        loadTasks();
    }, []);

    const total = tasks.length;

    const pending =
        tasks.filter(t => t.status === "Pending").length;

    const completed =
        tasks.filter(t => t.status === "Completed").length;

    const filteredTasks = tasks.filter((task) =>
        (task.title || "").toLowerCase().includes(search.toLowerCase())
        ||
        (task.description || "").toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div style={{
            minHeight: "100vh",
            background: "#eef2f7",
            padding: "40px"
        }}>

            <div style={{
                maxWidth: "1400px",
                margin: "auto"
            }}>

                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "30px"
                }}>

                    <div>

                        <h1 style={{
                            margin: 0,
                            color: "#1e293b"
                        }}>
                            Task Workflow Manager Dashboard
                        </h1>

                        <p style={{
                            color: "#64748b"
                        }}>
                            Manage workflow stages and track progress
                        </p>

                    </div>

                    <div>

                        <button
                            onClick={() => navigate("/profile")}
                            style={{
                                background: "#22c55e",
                                color: "white",
                                border: "none",
                                padding: "12px 25px",
                                borderRadius: "10px",
                                marginRight: "10px"
                            }}
                        >
                            Profile
                        </button>

                        <button
                            onClick={() => navigate("/")}
                            style={{
                                background: "#ef4444",
                                color: "white",
                                border: "none",
                                padding: "12px 25px",
                                borderRadius: "10px"
                            }}
                        >
                            Logout
                        </button>

                    </div>

                </div>

                <div style={{
                    background: "white",
                    padding: "25px",
                    borderRadius: "20px",
                    marginBottom: "25px"
                }}>

                    <h2>Create Task</h2>

                    <input
                        placeholder="Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "15px",
                            marginBottom: "10px",
                            borderRadius: "10px",
                            border: "1px solid #ddd"
                        }}
                    />

                    <input
                        placeholder="Task Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "15px",
                            marginBottom: "10px",
                            borderRadius: "10px",
                            border: "1px solid #ddd"
                        }}
                    />

                    <input
                        placeholder="Assign User Email"
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "15px",
                            marginBottom: "10px",
                            borderRadius: "10px",
                            border: "1px solid #ddd"
                        }}
                    />

                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "15px",
                            marginBottom: "10px",
                            borderRadius: "10px",
                            border: "1px solid #ddd"
                        }}
                    >
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>

                    <button
                        onClick={addTask}
                        style={{
                            background: "#2563eb",
                            color: "white",
                            border: "none",
                            padding: "12px 20px",
                            borderRadius: "10px"
                        }}
                    >
                        {editId ? "Update Task" : "Add Task"}
                    </button>

                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: "20px",
                    marginBottom: "25px"
                }}>

                    <div style={{
                        background: "white",
                        padding: "25px",
                        borderRadius: "15px",
                        textAlign: "center"
                    }}>
                        <h1>{total}</h1>
                        <p>Total Tasks</p>
                    </div>

                    <div style={{
                        background: "white",
                        padding: "25px",
                        borderRadius: "15px",
                        textAlign: "center"
                    }}>
                        <h1>{pending}</h1>
                        <p>Pending Tasks</p>
                    </div>

                    <div style={{
                        background: "white",
                        padding: "25px",
                        borderRadius: "15px",
                        textAlign: "center"
                    }}>
                        <h1>{completed}</h1>
                        <p>Completed Tasks</p>
                    </div>

                </div>

                <input
                    placeholder="Search Tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "15px",
                        borderRadius: "12px",
                        border: "1px solid #ccc",
                        marginBottom: "25px"
                    }}
                />

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
                    gap: "20px"
                }}>

                    {filteredTasks.map((task) => (
                        <div
                            key={task._id}
                            style={{
                                background: "white",
                                padding: "20px",
                                borderRadius: "15px"
                            }}
                        >

                            <h3>{task.title}</h3>
                            <p>{task.description}</p>

                            <p><b>Assigned User:</b> {task.assignedTo}</p>
                            <p><b>Priority:</b> {task.priority}</p>
                            <p><b>Status:</b> {task.status}</p>

                            {/* 🔥 EDIT BUTTON ADDED */}
                            <button
                                onClick={() => handleEdit(task)}
                                style={{
                                    background: "#f59e0b",
                                    color: "white",
                                    border: "none",
                                    padding: "8px",
                                    borderRadius: "8px",
                                    marginRight: "10px"
                                }}
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => progressTask(task._id)}
                                style={{
                                    background: "#3b82f6",
                                    color: "white",
                                    border: "none",
                                    padding: "8px",
                                    borderRadius: "8px",
                                    marginRight: "10px"
                                }}
                            >
                                In Progress
                            </button>

                            <button
                                onClick={() => completeTask(task._id)}
                                style={{
                                    background: "#22c55e",
                                    color: "white",
                                    border: "none",
                                    padding: "8px",
                                    borderRadius: "8px",
                                    marginRight: "10px"
                                }}
                            >
                                Complete
                            </button>

                            <button
                                onClick={() => deleteTask(task._id)}
                                style={{
                                    background: "#ef4444",
                                    color: "white",
                                    border: "none",
                                    padding: "8px",
                                    borderRadius: "8px"
                                }}
                            >
                                Delete
                            </button>

                        </div>
                    ))}

                </div>

            </div>
        </div>
    );
}

export default Dashboard;