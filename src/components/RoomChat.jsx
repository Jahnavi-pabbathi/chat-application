import React, { useContext, useState, useEffect } from "react"
import { over } from "stompjs"
import SockJS from "sockjs-client"
import { useNavigate } from "react-router-dom";
//import UserContext from "../UserContext";

var stompClient = null;
export const RoomChat = () => {
    // const [userName,setUserName] =useContext(UserContext)
    const userName = localStorage.getItem("userName");
    const [publicChats, setPublicChats] = useState("");
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: userName,
        receiverName: "",
        connected: false,
        message: ""
    })

    const onConnected = () => {
        setUserData({ ...userData, "connected": true })
        stompClient.subscribe('/chatroom/public', onPublicMessageReceived)
    }

    const onPublicMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);

     //  setUserData({...userData,"name":payloadData.name,"message":payloadData.message})

    }

    const onError = (err) => {
        console.log(err);
    }

    const registerUser = () => {
        let sock = new SockJS("http://localhost:8080/websocket");
        stompClient = over(sock);
        stompClient.connect({}, onConnected, onError);
    }

    const sendMessage = () => {
        console.log(publicChats)
        var message = {
            content: publicChats,
            messageType: 'CHATROOM',
            senderInfo: {
                senderId: '1234',
                senderName: userName
            },
            receiverInfo: {
                receiverId: '2345',
                receiverName: 'Bhargav'
            }
        };
        try{
            stompClient.send('/chat-service/chatroom/message', {}, JSON.stringify(message));
            console.log("sent successfully")
            console.log("usr name ",userName)
        }
        catch(exception ){
            console.log(exception);
            console.log("sorry i failed")
        }
        
       
    }


    useEffect(() => {
        registerUser();
    },[]);

    return (
        <div className="container">
            {userData.connected ?
                <>
                    <div className="chat-box">
                        <input
                            type="text"
                            id="messageInput"
                            value={publicChats}
                            onChange={(e) => setPublicChats(e.target.value)}
                            placeholder="Type a message..." />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                    <br />
                    <div>
                        {userData.message}
                    </div>
                </>

                : navigate("/")
            }

        </div>
    )
}