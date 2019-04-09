import React, {Component} from 'react';
import './Conversations.css';
import ChatsPanel from "../../components/ChatsPanel/ChatsPanel";
import MessagesPanel from "../../components/MessagesPanel/MessagesPanel";

class Conversations extends Component {

    render() {
        console.log('convs');
        return (
            <div class="Conversations">
                <ChatsPanel/>
                <MessagesPanel/>
            </div>
        );
    }
}

export default Conversations;
