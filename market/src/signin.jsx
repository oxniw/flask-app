import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from "react-router-dom";
import Home from "./home";
import Login from "./login";
function Signin() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [displayText1, setDisplayText1] = useState("");
  const [displayText2, setDisplayText2] = useState("");
  const ip1 = "http://192.168.1.2:8080/api/v1"
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const send =  await axios.post(ip1, {
      username: text1,
      password: text2,
    });
    setDisplayText1("Text sent successfully");
    if (send.data.message === "error"){
      setDisplayText2((send.data.why.join(", ")));
    } else {
      setDisplayText2(send.data.message);
      navigate("/home", { state: { userData: send.data.data ,name:send.data.name} });
    }
  }
  return (
    <div>
      <Link to="/login" className="login">log in</Link>
      <input 
        type="text" 
        value={text1} 
        onChange={(e) => setText1(e.target.value)} 
        placeholder="Enter username..."
      />
      <input 
        type="text" 
        value={text2} 
        onChange={(e) => setText2(e.target.value)} 
        placeholder="Enter password..."
      />
      <button onClick={handleSubmit}>sign in </button>
      <p>You entered: {displayText1}</p>
      <p>recieved:{displayText2}</p>
    </div>
  );
}
export default Signin;
