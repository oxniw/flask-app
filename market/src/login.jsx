import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";

import axios from "axios";
function login() {
    const [username,setusername] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();
    const ip1 = "http://192.168.1.2:8080/api/v2"
    const handleSubmit = async (event) => {
        event.preventDefault();//////////////////////////////////////////////////////////////////////////
        const send =  await axios.post(ip1, {
          username: username,
          password: password,
        });
        if (send.data.message === "ok"){
          alert("ok")
          navigate("/home", { state: { userData: send.data.data , name:send.data.name }} );
        } else {
          alert("wrong username or password");
        }
    }
  return (
    <div>
      <h1>Login</h1>
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setusername(e.target.value)} 
        placeholder="Enter username..."
      />
      <input 
        type="text" 
        value={password} 
        onChange={(e) => setpassword(e.target.value)} 
        placeholder="Enter password..."
      />
      <button onClick={handleSubmit}>sign in </button>
      <Link to="/signin">signin</Link>
    </div>
  )
}

export default login
