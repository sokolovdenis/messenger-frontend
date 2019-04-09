import React from 'react';
import './ChatsPanel.css';
import SearchPanel from '../SearchPanel/SearchPanel';
import ChatPreview from '../ChatPreview/ChatPreview';

const ChatsPanel = () => (
    <div className="ChatsPanel">
        <SearchPanel />
        <ul>
            <ChatPreview />
        </ul>
    </div>
);

export default ChatsPanel;
