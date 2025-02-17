import React, { useEffect, useState } from "react";
import { useLocation,Link,useNavigate } from "react-router-dom";
import axios from "axios";
function Home() {
  const handlesubmite = "http://192.168.1.2:8080/api/v3"
  const handelinvte = "http://192.168.1.2:8080/api/v8"
  //const handlemyfriend = "http://192.168.1.4:8083/api/v7"
  const location = useLocation();
  const userData = location.state?.userData;
  const name = location.state?.name || "Guest";
  const navigate = useNavigate();
  const [findname1,setText1] = useState("");
  const [findname2,setText2] = useState("");
  const handleSubmits = async (event) => {
    event.preventDefault();
    const send =  await axios.post(handlesubmite, {
      username: findname1,
      myname: name,
    });
    if (send.data.NO) {
      alert(`User not found ${send.data.NO}`);

      return;
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate("/friendlist", { state: { name:name }} );
  }
  const handleinvites = async (event) => {
    event.preventDefault();
    const send =  await axios.post(handelinvte, {
      myname: name,
    });
    navigate("/friendlistreal", { state: { inboxs: send.data.inboxs , name:name }} );
  }
  const myfriend = async (event) => {
    event.preventDefault();
    const send =  await axios.post(handelinvte, {
      myname: name,
    });
    navigate("/seefirendisreal", { state: {name:name }} );
  }
  return (
    <div>
      <h1>Welcome to Home</h1>
      <h2>Username</h2>
      <p>{name}</p>
      <h2>Sources</h2>
      <p>Money: {userData.sources?.money ?? 0}</p>
      <h2>find Friends</h2>
      <button onClick={handleSubmit}>in box</button>
      <button onClick={handleinvites}>had invites</button>
      <button onClick={myfriend}>my friend</button>
      <input 
        type="text" 
        value={findname1} 
        onChange={(e) => setText1(e.target.value)} 
        placeholder="Enter username..."/>
        <button onClick={handleSubmits}>Say Hello</button>
      <ul>
        {Object.entries(userData.freinds).map(([key, value]) => (
          <li key={key}>{`${key}: ${value}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
