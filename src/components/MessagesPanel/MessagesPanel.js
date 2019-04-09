import React from 'react';
import './MessagesPanel.css';
import NewMessage from '../NewMessage/NewMessage';
import Message from "../Message/Message";
import ChatInfo from "../ChatInfo/ChatInfo";

const MessagesPanel = () => (
    <div className="ChatsPanel">
        <ChatInfo/>
        <ul>
            <Message/>
        </ul>
        <NewMessage />
    </div>
);

export default MessagesPanel;
