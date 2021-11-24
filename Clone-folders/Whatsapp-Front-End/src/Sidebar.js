import React from 'react'
import "./Sidebar.css";
import SidebarChat from "./SidebarChat"
import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar ,IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';

function Sidebar() {
    return (
        <div className="sidebar">

            {/* sidebar header */}
            <div className="sidebar_header">
                    <Avatar alt="" src="my.jpeg" />
                <div className="sidebar_headerRight">
                <IconButton>
                    <DonutLargeIcon />
                </IconButton>
                <IconButton>
                    <ChatIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
                </div>
            </div>
                <div className="sidebar_search">
                    <div className="sidebar_searchContainer">
                        <SearchOutlined />
                        <input type="text" placeholder="Search or start new chat" />
                    </div>
                </div>

                <div className="sidebar_chats">
                    <SidebarChat />
                    <SidebarChat />
                    <SidebarChat />
                </div>           
        </div>
    );
}

export default Sidebar;
