import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function FriendList() {
  const accepthandle = "http://192.168.1.2:8080/api/v5"
  const cancelhandle = "http://192.168.1.2:8080/api/v6"
  const sendrequest = "http://192.168.1.2:8080/api/v7"
  const location = useLocation();
  const [userData, setUserData] = useState([]);
  const name = location.state?.name || "Guest";
  const handleDelete = (inboxusername) => {
    setUserData((prevData) => prevData.filter((user) => user !== inboxusername));
  };
  const handleAccept = async (inboxusername, event) => {
    event.preventDefault();
      await axios.post(accepthandle, {
        host: name,
        inboxs: inboxusername,
      });
      handleDelete(inboxusername);
  };
  const handleCancel = async (inboxusername, event) => {
    event.preventDefault();
      await axios.post(cancelhandle, {
        host: name,
        inboxs: inboxusername,
      });
      handleDelete(inboxusername);
  };
  useEffect(() => {
    const sendRequest = async () => {
        const response = await axios.post(sendrequest, {
          myname: name,
        });
        setUserData(response.data.inboxs);
    };
    sendRequest();
  }, [name]);

  return (
    <div>
      {userData.map((inboxusername, i) => (
        <div key={i} className="p-4 bg-gray-200 rounded">
          {inboxusername}
          <button onClick={(event) => handleAccept(inboxusername, event)}>Accept</button>
          <button onClick={() => handleCancel(inboxusername, event)}>Cancel</button>
        </div>
      ))}
    </div>
  );
}

export default FriendList;
