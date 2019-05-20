import React from 'react';
import './styles.css';
import {getPublicMessages, sendPublicMessage, configWebSoket, getAllConversations, getPrivateMessages, sendPrivateMessage} from '../../serverApi';
import {getAuthToken} from '../../jwt';
import './styles.css';
import {v4} from 'uuid';


function Message(props) {
    const message = props.message;
    const content = message.content;
    const user = message.user;
    const timestamp = new Date(message.timestamp);
    const me = props.me;

    return (
        <div className={"Message" + (me ? " Me" : "")}>
            <span className="Message-User">{user}</span>
            <article className="Message-Content">{content}</article>
            <time className="Message-Time">{timestamp.toLocaleString()}</time>
        </div>
    );
}

class MessageList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messagesEnd: undefined
        };

        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    scrollToBottom() {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        const messages = this.props.messages;
        const myId = this.props.myId;

        console.log("---");
        console.log(myId);
        console.log(messages);

        return (
            <div className="Message-List">
                {messages.map(data => <Message message={data} me={myId === data.user} key={v4()}/>)}

                <div style={{float: "left", clear: "both"}}
                     ref={(el) => {this.messagesEnd = el;}}>
                </div>
            </div>
        );
    }
}


class MessageTextArea extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const message = event.target.value;
        if( message.endsWith("\n") ) {
            if( message.length > 1 ) {
                this.props.onSend(this.state.message);
            }
            this.setState({message: ""});
        } else {
            this.setState({message: message});
        }
    }

    render() {
        return (
            <div className="Message-Text-Area">
                <textarea value={this.state.message}
                          onChange={this.handleInputChange}
                          className="Message-Input"/>
            </div>
        );
    }
}

function Chat(props) {
    const messages = props.messages;
    const myId = props.myId;
    const participantId = props.participantId;

    return (
        <div className="Chat">
            <MessageList messages={messages} myId={myId} />
            <MessageTextArea onSend={(message) => {
                if( !participantId ) {
                    sendPublicMessage(message, getAuthToken());
                } else {
                    sendPrivateMessage(participantId, message, getAuthToken());
                }
            }}/>
        </div>
    );
}

function ConversationList(props) {
    const conversations = props.conversations;
    const onClick = props.onClick;
    const myId = props.myId;

    return (
        <div className="Conversation-List">
            {conversations.map(data => <Conversation conversation={data} myId={myId} onClick={onClick} key={v4()} />)}
        </div>
    );
}

function Conversation(props) {
    const conversation = props.conversation;
    let lastMessage = conversation.lastMessage;
    const participant = conversation.participant;
    const onClick = props.onClick;
    const id = conversation.id;
    const myId = props.myId;

    if( lastMessage.content.length > 30 ) {
        lastMessage.content = lastMessage.content.slice(0, 30) + "...";
    }

    if( participant === "00000000-0000-0000-0000-000000000000" ) {
        return null;
    } else {
        return (
            <div className="Conversation" onClick={() => onClick(id)}>
                <div className="Participant">{!!participant ? participant : "public"}</div>
                <Message me={myId === lastMessage.user} message={lastMessage}/>
            </div>
        );
    }
}

class Messenger extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            conversations: [],
            openConversationId: null
        };

        this.handleNewMessage = this.handleNewMessage.bind(this);
        this.configWebSoket = configWebSoket.bind(this);
        this.openConversation = this.openConversation.bind(this);

        getAllConversations(getAuthToken()).then(data => {
            data = data.map(conversation => {
                conversation["messages"] = [conversation.lastMessage];
                return conversation;
            });
            this.setState({conversations: data});
        });

        this.configWebSoket(getAuthToken(), this.handleNewMessage);
    }

    handleNewMessage(message) {
        this.setState({conversations: this.state.conversations.map(
            conversation => {
                const lastMessage = conversation.lastMessage;
                console.log("lastMessage", lastMessage);
                console.log("message", message);
                conversation.lastMessage = (
                    message.conversationId === lastMessage.conversationId ? message : lastMessage
                );
                return conversation;
            }
        )});
        if( message.conversationId === this.state.openConversationId ) {
            this.setState({messages: this.state.messages.concat([message])});
        }
    }

    openConversation(conversationId) {
        this.setState({openConversationId: conversationId});
        if( conversationId === "public" ) {
            getPublicMessages(-10, 10, getAuthToken()).then(data => {
                this.setState({messages: data})
            });
        } else {
            this.state.conversations.map(conversation => {
                if( conversation.id === conversationId ) {
                    const userId = conversation.participant;
                    getPrivateMessages(userId, -10, 10, getAuthToken()).then(data => {
                        this.setState({messages: data})
                    });
                }
            });
        }
    }

    render() {
        const conversations = this.state.conversations;
        const messages = this.state.messages;
        const openConversationId = this.state.openConversationId;
        const myId = this.props.myId;

        let participantId;
        for( let conversation of conversations ) {
            if( conversation.id === openConversationId ) {
                participantId = conversation.participant;
            }
        }
        console.log(conversations);
        console.log(openConversationId);
        console.log(participantId);
        return (
            <div className="Messenger">
                <ConversationList conversations={conversations} myId={myId} onClick={this.openConversation}/>
                <Chat messages={messages} myId={myId} participantId={participantId}/>
            </div>
        );
    }
}

export default Messenger;
