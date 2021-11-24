import React, { useState, useEffect } from 'react';
import "./Chat.css";
import { Avatar ,IconButton } from '@mui/material';
import { SearchOutlined, SettingsInputAntenna } from '@mui/icons-material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import axios from "./axios";

function Chat({ messages }) {
    const [input, setInput] = useState('');
    const [seed, setSeed ] = useState('');
    useEffect(function(){
        setSeed(Math.floor(Math.random() * 5000));
    },[]);
    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post('/messages/new', {
            message: input,
            name: "Demo Name",
            timestamp: "Just now",
            recieved: false
        });
        setInput("");
    };

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chatHeader_info">
                {/* <Avatar />  */}
                    <h3 className="room_name">Testing Room</h3>
                    <p>Last seen at <span>{new Date().toLocaleTimeString()}</span></p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>    
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
             <div className="chat_body">
                {messages.map((message) => (
                    <p className={`chat_message ${message.received && "chat_reciever"}`}>
                        <span className="chat_name">{message.name}</span>
                        {message.message}
                        <span className="chat_timestamp">{message.timestamp}</span>
                    </p>
                ))}
            </div>

             <div className="chat_footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" type="text" />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon />
             </div>
        </div>
    )
}

export default Chat;
