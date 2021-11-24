import React, { useEffect, useState } from 'react';
import "./SidebarChat.css";
import { Avatar } from '@mui/material';

function SidebarChat() {
    const [seed, setSeed ] = useState('');
    useEffect(function(){
        setSeed(Math.floor(Math.random() * 5000));
    },[]);
    return (
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidebarChat_info">
                <h2>Testing Room</h2>
                <p>This room is for testing the application</p>
            </div>
        </div>
    )
}

export default SidebarChat;
