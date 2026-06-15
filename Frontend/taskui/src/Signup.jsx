import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  async function signup(){

    const response = await fetch(
      "http://localhost:8081/users/signup",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name:name,
          email:email,
          password:password,
          role:"user"
        })
      }
    );

    if(response.ok){

      alert("Account Created Successfully");

      navigate("/");

    }else{

      alert("Signup Failed");

    }

  }

  return (

    <div style={{
      height:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      background:"#eef2f7"
    }}>

      <div style={{
        width:"380px",
        padding:"35px",
        borderRadius:"20px",
        background:"white",
        boxShadow:"0 10px 30px rgba(0,0,0,.15)"
      }}>

        <h1 style={{
          textAlign:"center",
          color:"#1e293b"
        }}>
          Create Account
        </h1>

        <input
        placeholder="Full Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        style={{
          width:"100%",
          padding:"12px",
          marginTop:"20px",
          borderRadius:"10px",
          border:"1px solid #ccc"
        }}
        />

        <input
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        style={{
          width:"100%",
          padding:"12px",
          marginTop:"15px",
          borderRadius:"10px",
          border:"1px solid #ccc"
        }}
        />

        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        style={{
          width:"100%",
          padding:"12px",
          marginTop:"15px",
          borderRadius:"10px",
          border:"1px solid #ccc"
        }}
        />

        <button
        onClick={signup}
        style={{
          width:"100%",
          padding:"12px",
          marginTop:"20px",
          background:"#2563eb",
          color:"white",
          border:"none",
          borderRadius:"10px"
        }}>
          Signup
        </button>

        <p style={{
          textAlign:"center",
          marginTop:"15px"
        }}>
          <Link to="/">
            Already have account? Login
          </Link>
        </p>

      </div>

    </div>

  );

}

export default Signup;