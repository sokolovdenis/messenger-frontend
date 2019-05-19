import React, { Component } from 'react';
import DialogueList from './DialogueList'
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import Search from './Search';
import SearchResultList from './SearchResultList';
import { get_websocket, get_conversations, get_me, find_users, post_private_messages, post_public_messages, get_private_messages, get_public_messages, get_user } from '../../api/service';
import Header from './Header';
import Websocket from 'react-websocket';
import '../css/Chat.css';


class Chat extends Component {
	constructor(props) {
        super(props);
        this.state = {
            activeChatName: null,
            messages: [],
            chats: [],
            myId: null,
            myName: '',
            names: {},
            query: '',
            searchResults: [],
            from: 0,
            count: 10,
            isLoadingMessages: false,
        };

        this.showed_names = {};

        this.showConversations  = this.showConversations.bind(this);
        this.showMessages = this.showMessages.bind(this);
        this.showPostedMessage = this.showPostedMessage.bind(this);
        this.showMyUserName = this.showMyUserName.bind(this);
        this.showName = this.showName.bind(this);
        this.showSearchResults = this.showSearchResults.bind(this);
        this.selectConversation  = this.selectConversation.bind(this);
        this.showErrorMessage = this.showErrorMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.sendQuery = this.sendQuery.bind(this);
        this.handleIncomingMessage = this.handleIncomingMessage.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        get_conversations()
            .then(this.showConversations)
            .catch(this.showErrorMessage);
        this.selectConversation(null);
        get_me()
            .then(this.showMyUserName)
            .catch(this.setAlert)
    }

    showErrorMessage(msg) {
        console.log("error ", msg);
    }

    selectConversation(userId) {
        if (userId == null) {
            this.setState({ activeChatName: userId });
            get_public_messages()
                .then(this.showMessages)
                .catch(this.showErrorMessage);
            this.setState({from: 0});
        }
        else {
            this.setState(function(prevState, props) {
                var findConveration = this.state.chats.find(
                    function(element, index, array) {
                        if (element.participant === userId) {
                            return true;
                        }
                        return false;
                    }
                );
                if (typeof findConveration != "undefined") {
                    var lastMessageId = findConveration.lastMessage.id;
                    var count = prevState.count;
                    prevState.from = (lastMessageId - count > 0) ? lastMessageId - count : 0;
                }
                return {from: prevState.from, count: 10, messages: [], activeChatName: userId};
            });
        }
    }

    handleScroll(page) {
        if (this.state.activeChatName != null) {
            var userId = this.state.activeChatName;
            var isLoading = this.state.isLoadingMessages;
            if (!isLoading) {
                this.setState({isLoadingMessages: true});
                get_private_messages(userId, this.state.from, this.state.count)
                    .then((data) =>
                        this.setState(function(prevState, props) {
                            return {messages: data.concat(prevState.messages)};
                        })
                    )
                    .then(() =>
                        this.setState(function(prevState, props) {
                            var count = prevState.count;
                            var from = prevState.from;
                            var isLoadingMessages = (from <= 0);
                            from = (from - count > 0) ? from - count : 0;
                            count = (from === 0) ? prevState.from : count;
                            return {from: from, count: count, isLoadingMessages: isLoadingMessages}
                        })
                    )
                    .catch(this.showErrorMessage);
            }
        }
    }

    showConversations(data) {
        data.sort(function(x, y) {
            x = new Date(x.lastMessage.timestamp);
            y = new Date(y.lastMessage.timestamp);
            if (x > y) {
                return -1;
            }
            if (x < y) {
                return 1;
            }
            return 0;
        });
        this.setState({ chats: data });
    }

    showMessages(data) {
        this.setState({ messages: data });
    }

    showMyUserName(data) {
        this.setState({ myName: data.name, myId: data.id });
    }

    sendMessage(message) {
        if (this.state.activeChatName == null) {
           post_public_messages(message)
                .then(this.showPostedMessage)
                .catch(this.showErrorMessage);
        }
        else {
            post_private_messages(this.state.activeChatName, message)
                .then(this.showPostedMessage)
                .catch(this.showErrorMessage);
        }
    }

    sendQuery(query) {
        this.setState({ query: query });
        find_users(query)
            .then(this.showSearchResults)
            .catch(this.showErrorMessage);
    }

    showPostedMessage(data) {
        var response = data[0];
        var participant = data[1];
        this.setState(
            function(prevState, props) {
                var findResult = prevState.chats.find(
                    function(element, index, array) {
                        if (element.id === response.conversationId) {
                            return true;
                        }
                        return false;
                    }
                );
                if (typeof findResult == "undefined") {
                    var chatElement = {
                        lastMessage: {
                            conversationId: response.conversationId,
                            timestamp: response.timestamp,
                            user: response.user,
                            content: response.content,
                            id: response.id
                        },
                        participant: participant,
                        id: response.conversationId
                    };
                    prevState.chats = [chatElement].concat(prevState.chats)
                }
                prevState.messages.push(response);
                return {messages: prevState.messages, chats: prevState.chats}
            }
        );
    }

    showName(id, name=null) {
        if (id === null) {
            return 'public';
        }
        if (id in this.state.names) {
            return this.state.names[id];
        }
        else {
            if (name != null) {
                this.setState(function(prevState, props){
                    prevState.names[id] = name;
                    return {names: prevState.names}
                });
                return name;
            }
            if (!(id in this.showed_names)) {
                this.showed_names[id] = '###';
                get_user(id)
                    .then(data => {
                        this.setState(function(prevState, props){
                            prevState.names[data.id] = data.name;
                            return {names: prevState.names}
                        });
                    })
                    .catch(this.showErrorMessage)
            }
            return this.state.names[id] || this.showed_names[id];
        }
    }

    showSearchResults(data) {
        this.setState({ searchResults: data});
    }

    handleIncomingMessage(data) {
        data = JSON.parse(data);
        if (data.User !== this.state.myId) {
            this.setState(
                function(prevState, props) {
                    var findCondition = function(element, index, array) {
                        if (element.id === data.ConversationId) {
                            return true;
                        }
                        return false;
                    };
                    var findResult = prevState.chats.find(findCondition);
                    var chatName = data.ConversationId === 'public' ? null : data.User;
                    var chatElement = {
                        lastMessage: {
                            conversationId: data.ConversationId,
                            timestamp: data.Timestamp,
                            user: data.User,
                            content: data.Content,
                            id: data.Id
                        },
                        participant: chatName,
                        id: data.ConversationId
                    };
                    if (typeof findResult == "undefined") {
                        prevState.chats = [chatElement].concat(prevState.chats)
                    }
                    else {
                        var findResultIndex = prevState.chats.findIndex(findCondition);
                        prevState.chats.splice(findResultIndex, 1);
                        prevState.chats = [chatElement].concat(prevState.chats);
                    }
                    if (chatName === prevState.activeChatName) {
                        var message = {
                            conversationId: data.ConversationId,
                            timestamp: data.Timestamp,
                            user: data.User,
                            content: data.Content,
                            id: data.Id
                        };
                        prevState.messages.push(message);
                    }
                    return {messages: prevState.messages, chats: prevState.chats}
                }
            );
        }
    }


    render() {
        return (
            <div>
                <Header name={this.state.myName} logout={this.props.logout} />
                <div className="messenger">
                    <div className="inbox-people">
                        <Search
                            sendQuery={this.sendQuery} />
                        { this.state.query === '' ?
                            (
                            <DialogueList
                                selectConversation={this.selectConversation}
                                activeChatName={this.state.activeChatName}
                                chats={this.state.chats}
                                showName={this.showName} />
                            ):
                            (
                            <SearchResultList
                                selectConversation={this.selectConversation}
                                activeChatName={this.state.activeChatName}
                                chats={this.state.chats}
                                showName={this.showName}
                                results={this.state.searchResults} />
                            )
                        }    
                    </div>
                    <div className="mesgs">
                        <MessageList 
                            selectConversation={this.selectConversation}
                            activeChatName={this.state.activeChatName}
                            userId={this.state.myId}
                            messages={this.state.messages}
                            showName={this.showName} 
                            handleScroll={this.handleScroll} />
                        <SendMessageForm
                            sendMessage={this.sendMessage} />
                    </div>
                </div>
                <Websocket url={get_websocket()}
                    onMessage={this.handleIncomingMessage}/>
            </div>
        );
    }
}

export default Chat
