import React from 'react';
import './MessagesPanel.css';
import NewMessage from '../NewMessage/NewMessage';
import Message from "../Message/Message";
import TopBar from "../TopBar/TopBar";

const MessagesPanel = () => (
    <div className="ChatsPanel">
        <TopBar/>
        <ul>
            <Message/>
        </ul>
        <NewMessage />
    </div>
);

export default MessagesPanel;
