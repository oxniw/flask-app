import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function FriendList() {
  const ip1 = "http://192.168.1.2:8080/api/v8"
  const location = useLocation();
  const [userData, setUserData] = useState([]);
  const name = location.state?.name || "Guest";
  useEffect(() => {
    const sendRequest = async () => {
        const response = await axios.post(ip1, {
          myname: name,
        });
        setUserData(response.data.myinvites);
    };
    sendRequest();
  }, [name]);

  return (
    <div>
      {userData.map((inboxusername, i) => (
        <div key={i} className="p-4 bg-gray-200 rounded">
          {inboxusername}
        </div>
      ))}
    </div>
  );
}

export default FriendList;
