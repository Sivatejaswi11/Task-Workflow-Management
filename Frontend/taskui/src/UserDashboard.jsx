import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  async function loadMyTasks() {
    const email = localStorage.getItem("email").trim().toLowerCase();

    const res = await fetch(
      `http://localhost:8002/task/user/${email}`
    );

    const data = await res.json();
    setTasks(data);
  }

  async function updateTask(id, status) {
    await fetch(`http://localhost:8002/task/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });

    loadMyTasks();
  }

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  useEffect(() => {
    loadMyTasks();
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      padding: "30px",
      fontFamily: "Arial"
    }}>

      {/* TOP BAR */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px"
      }}>
        <h1 style={{
          color: "white",
          letterSpacing: "1px"
        }}>
          My Task Space
        </h1>

        <div>
          <button
            onClick={() => navigate("/profile")}
            style={{
              padding: "10px 15px",
              marginRight: "10px",
              border: "none",
              borderRadius: "8px",
              background: "#38bdf8",
              color: "black",
              fontWeight: "bold"
            }}
          >
            Profile
          </button>

          <button
            onClick={logout}
            style={{
              padding: "10px 15px",
              border: "none",
              borderRadius: "8px",
              background: "#ef4444",
              color: "white",
              fontWeight: "bold"
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* EMPTY STATE */}
      {tasks.length === 0 ? (
        <div style={{
          textAlign: "center",
          marginTop: "100px",
          color: "#94a3b8"
        }}>
          <h2>No Tasks Assigned 🚀</h2>
          <p>Relax bro, admin didn’t give you work yet 😎</p>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px"
        }}>
          {tasks.map((task) => (
            <div key={task._id}
              style={{
                background: "#1e293b",
                padding: "20px",
                borderRadius: "15px",
                boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
                borderLeft: "5px solid #38bdf8"
              }}
            >

              <h2 style={{ color: "white" }}>{task.title}</h2>

              <p style={{ color: "#cbd5e1" }}>
                {task.description}
              </p>

              <p style={{ color: "#94a3b8" }}>
                Status: <b>{task.status}</b>
              </p>

              <p style={{ color: "#94a3b8" }}>
                Priority: {task.priority}
              </p>

              {/* BUTTONS */}
              <div style={{ marginTop: "15px" }}>

                <button
                  onClick={() => updateTask(task._id, "InProgress")}
                  style={{
                    padding: "8px 12px",
                    marginRight: "10px",
                    border: "none",
                    borderRadius: "8px",
                    background: "#f59e0b",
                    color: "black",
                    fontWeight: "bold"
                  }}
                >
                  Start
                </button>

                <button
                  onClick={() => updateTask(task._id, "Completed")}
                  style={{
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "8px",
                    background: "#22c55e",
                    color: "black",
                    fontWeight: "bold"
                  }}
                >
                  Done
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;