import React, { useContext, useState, useEffect } from "react"
import { over } from "stompjs"
import SockJS from "sockjs-client"
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import './form.css'
//import UserContext from "../UserContext";

var stompClient = null;
export const RoomChat = () => {
    // const [userName,setUserName] =useContext(UserContext)
    const userName = localStorage.getItem("userName");
    const [publicChats, setPublicChats] = useState([]);
    const navigate = useNavigate();
    const [messageToSend, setMessageToSend] = useState("");
    const [connected, setConnected] = useState(false)

    const onConnected = () => {

        setConnected(true)
        stompClient.subscribe('/chatroom/public', onPublicMessageReceived)
    }

    const onPublicMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        setPublicChats((prevChats) => [...prevChats, payloadData]);

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
        console.log(messageToSend)
        var message = {
            content: messageToSend,
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
        try {
            stompClient.send('/chat-service/chatroom/message', {}, JSON.stringify(message));
            setMessageToSend("");
            console.log("sent successfully")
            console.log("usr name ", userName)
        }
        catch (exception) {
            console.log(exception);
            console.log("sorry i failed")
        }


    }


    useEffect(() => {
        registerUser();
    }, []);

    return (
        <Grid container spacing={0} className="container">
            <Grid item xs={3} style={{ backgroundColor: "#6c88c8" }} className="sidebar">

            </Grid>
            <Grid item xs={9} style={{ backgroundColor: "lightgray" }}>
                {connected ? (
                    <div className="chat-box">
                        <input
                            type="text"
                            className="input-field"
                            value={messageToSend}
                            onChange={(e) => setMessageToSend(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button className="button" onClick={sendMessage}>
                            Send
                        </button>
                    </div>
                ) : (
                    navigate("/")
                )}
                <div className="chat-content">
                    {publicChats.map((chat, index) => (
                        <div key={index} className="message">
                           
                            
                            <div className="content">
                                <div className="userName">{userName}:</div>
                                <div className="chatMessage">{chat.content}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </Grid>
        </Grid>

    )
}