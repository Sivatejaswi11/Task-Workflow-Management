import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {

    const email = localStorage.getItem("email");

    fetch("http://localhost:8081/users/profile/" + email)

      .then(res => res.json())
      .then(data => {
        console.log("PROFILE DATA =", data);
        setUser(data);
      })
      .catch(error => {
        console.log(error);
      });

  }, []);

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#eef2f7",
      padding: "40px"
    }}>

      <div style={{
        maxWidth: "700px",
        margin: "auto"
      }}>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px"
        }}>

          <h1 style={{
            color: "#1e293b"
          }}>
            My Profile
          </h1>

          <div>

            <button
              onClick={() => navigate("/admin")}
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "10px",
                marginRight: "10px"
              }}
            >
              Dashboard
            </button>

            <button
              onClick={logout}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "10px"
              }}
            >
              Logout
            </button>

          </div>

        </div>

        <div style={{
          background: "white",
          padding: "35px",
          borderRadius: "20px",
          textAlign: "center"
        }}>

          {
            user ? (
              <>
                <h2>{user.name}</h2>
                <p><b>ID :</b> {user.id}</p>
                <p><b>Email :</b> {user.email}</p>
                <p><b>Role :</b> {user.role}</p>
              </>
            ) : (
              <h3>Loading Profile...</h3>
            )
          }

        </div>

      </div>
    </div>
  );
}

export default Profile;