import React from 'react'
import "./Chatmessage.css";

function Chatmessage() {
    return (
        <div className="chatmessage">
            <p className="chat_message">
                    <span className="chat_name">Irtaza</span>
                    This is a message
                    <span className="chat_timestamp">
                        {new Date().toUTCString()}
                    </span>
            </p>
        </div>
    )
}

export default Chatmessage;
