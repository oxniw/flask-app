import React , {useState , useEffect} from 'react'
import axios from 'axios'
import { useLocation,Link,useNavigate } from "react-router-dom";
import './divboxhandle.css'
function seefirendisreal() {
    const navigate = useNavigate()
    const location = useLocation();
    const [data, setData] = useState([])
    const [chatdata, setchatData] = useState([])
    const [chatcode, setchatcode] = useState("")
    const [chatboxd,chats] = useState("")
    const [checkisthesame, setcheckisthesames] = useState("")
    const name = location.state?.name || "Guest";
    const ip4 = "http://192.168.1.2:8080/api/v12"
    const ip1 = "http://192.168.1.2:8080/api/v9"
    const ip2 = "http://192.168.1.2:8080/api/v10"
    const ip3 = "http://192.168.1.2:8080/api/v11"
    const sendRequest = async () => {
      const response = await axios.post(ip1, {
        myname: name,
      });
      setData(response.data.myfreinds);
    };
    const openchat = async (myfriendname) => {
      
      const response = await axios.post(ip2,{
        myname: name,
        friendname: myfriendname,
      })
      console.log(response.data.chatid , response.data.friendname, response.data.myname,response.data.chatdata)
      setchatData(response.data.chatdata.messageinchat)
      setchatcode(response.data.chatid)
    }
    const sendchat = async (chat) => {
      const response = await axios.post(ip3,{
        chatid: chatcode,
        myname: name,
        message: chat,
      })
    }
    const gettext = () =>{
      console.log(chatboxd)
      if (chatboxd !== undefined && chatboxd !== "") {
        sendchat(chatboxd)
        chats('');
      }
      
    }
    const checksd = async () => {
      const response = await axios.post(ip4,{
        chatid: chatcode,
        myname: name,
        chat:chatdata,
      })
      setcheckisthesames(response.data.chatid)
      console.log(response.data.OK)
      if (response.data.chat !== chatdata && response.data.chat !== undefined) {
        console.log("O")
        setchatData(response.data.chat);
      }
    }
    useEffect(() => {
    sendRequest();
    const interval = setInterval(() => {
      if (chatcode !== null && chatcode !== undefined && chatcode !== "") {
        checksd();
      }
    }, 1000);
    return () => clearInterval(interval);
    }, [chatcode])
    //while true: ไปที่ server ถ้า last update != new update ให้ update
  return (
    <div>
        <div className="chatboxhandle">
          {chatcode !== null && chatcode !== undefined && chatcode !== "" && (
          <>
            <input
              type="text"
              value={chatboxd}
              onChange={(e) => chats(e.target.value)}
              placeholder="Send message"
              className="input"
            />
            <button onClick={gettext} className="button">
              Send
            </button>
          </>
        )}
        <div className="chathander">
        {chatdata.map((chat, i) => (
          <div key={i} className="namedd" style={{fontSize: "30px", width:`${chat.message.length*15}px` }}>
            <div
              className="sender"
              style={{ backgroundColor: chat.sender === name ? "blue" : "green" }}
            >
              {chat.sender}
            </div>
            <div className="message">{chat.message}</div>
          </div>
        ))}
        </div>
      </div>

        {data.map((inboxusername, i) => (
          <div key={i} className="named">
            {inboxusername}
            <button onClick={() =>openchat(inboxusername)}>chat</button>
          </div>
        ))}
    </div>
  )
}

export default seefirendisreal
