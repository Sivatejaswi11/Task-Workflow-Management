import { Link,useNavigate } from "react-router-dom";
import {useState} from "react";


function Login(){


const navigate = useNavigate();


const [email,setEmail]=useState("");

const [password,setPassword]=useState("");





async function login(){



try{



const response = await fetch(

"http://localhost:8081/users/login",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

email:email,

password:password

})


}



);



const data = await response.json();



console.log(
"LOGIN RESPONSE = ",
data
);





if(data.token){



localStorage.clear();




localStorage.setItem(

"token",

data.token

);



localStorage.setItem(

"email",

data.email

);



localStorage.setItem(

"role",

data.role

);






if(data.role === "admin"){


navigate("/admin");


}



else if(data.role === "user"){


navigate("/user");


}



else{


alert("Role not found");


}



}


else{


alert("Invalid Credentials");


}



}



catch(error){


console.log(error);


alert("Login Failed");


}



}








return(



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

Task Workflow Manager

</h1>




<p style={{

textAlign:"center",

color:"#64748b"

}}>

Login to continue

</p>






<input

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

style={{

width:"100%",

padding:"12px",

borderRadius:"10px",

border:"1px solid #ccc",

marginTop:"20px"

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

borderRadius:"10px",

border:"1px solid #ccc",

marginTop:"15px"

}}

/>







<button

onClick={login}

style={{

width:"100%",

padding:"12px",

background:"#2563eb",

color:"white",

border:"none",

borderRadius:"10px",

marginTop:"20px"

}}

>

Login

</button>







<p style={{

textAlign:"center",

marginTop:"15px"

}}>


<Link to="/signup">

Create Account

</Link>


</p>





</div>


</div>



);


}


export default Login;