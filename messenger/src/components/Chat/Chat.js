import React, { Component } from 'react';
import ConversationList from './ConversationList/ConversationList'
import MessageList from './MessageList/MessageList';
import SendMessageForm from './SendMessageForm/SendMessageForm';
import SearchPanel from './SearchPanel/SearchPanel';
import SearchResultList from './SearchResultList/SearchResultList';
import { authenticationService } from '../../services/Api/Api';
import Header from './Header/Header';
import Websocket from 'react-websocket';
import './Chat.css';


class Chat extends Component {
	constructor(props) {
        super(props);
        // console.log(authenticationService.getCurrentUser());
        this.state = {
            activeChatName: null,  // userId активной чат комнаты (public==null)
            messages: [],  // сообщения в активной чат комнате
            chats: [],  // список чат комнат
            myId: null, // Id залогиненного пользователя
            myName: '',  // Имя залогиненного пользователя
            names: {}, // словарь id:имя
            query: '', // запрос поиска,
            searchResults: [], // результаты поиска
        };

        this.showed_names = {} // имена для которых уже создали запрос

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
    }
    
    componentDidMount() {    
        // загружаем список чатов
        authenticationService.getConversations()
            .then(this.showConversations)
            .catch(this.showErrorMessage);
        // выбираем и загружаем диалог по умолчанию
        this.selectConversation(null);
        // загружаем данные о себе
        authenticationService.getMe()
            .then(this.showMyUserName)
            .catch(this.setAlert)
    }

    showErrorMessage(msg) {
        console.log(msg);
    }

    selectConversation(id) {
        //отвечает не только за выбор обсуждения из списка,
        //но и создание нового если тыкнуть на имя в сообщении
        // если при поиске нажать на найденное пустое обсуждение,
        // то нужно при отправке сообщения добавить новую запись в chats
        this.setState({ activeChatName: id });
        if (id == null) {
            authenticationService.getPublicMessages()
                .then(this.showMessages)
                .catch(this.showErrorMessage);
        }
        else {
            authenticationService.getPrivateMessages(id)
                .then(this.showMessages)
                .catch(this.showErrorMessage);
        }
    }

    showConversations(data) {
        // сортируем по дате (можно еще по прочитанным и не прочитанным)
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
        // надо проверить если сообщений нет
        // console.log(data);
        this.setState({ messages: data });
    }

    showMyUserName(data) {
        this.setState({ myName: data.name, myId: data.id });
    }

    sendMessage(message) {
        // отправляем сообщение на сервер,
        // в ответ получаем ответ сервера + chat.participant
        if (this.state.activeChatName == null) {
            authenticationService.postPublicMessages(message)
                .then(this.showPostedMessage)
                .catch(this.showErrorMessage);
        }
        else {
            authenticationService.postPrivateMessages(this.state.activeChatName, message)
                .then(this.showPostedMessage)
                .catch(this.showErrorMessage);
        }
    }

    sendQuery(query) {
        // отправляем сообщение на сервер 
        this.setState({ query: query });
        authenticationService.findUsers(query)
            .then(this.showSearchResults)
            .catch(this.showErrorMessage);
    }

    showPostedMessage(data) {
        var response = data[0];
        var participant = data[1];
        this.setState(
            function(prevState, props) {
                // если мы пишем кому-то с кем до этого не общались, 
                // то нужно добавить новый элемент в массив chats
                var findResult = prevState.chats.find(
                    function(element, index, array) {
                        if (element.id == response.conversationId) {
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
                    // обновляем список обсуждений
                    prevState.chats = [chatElement].concat(prevState.chats)
                }
                prevState.messages.push(response);
                return {messages: prevState.messages, chats: prevState.chats}
            }
        );
    }

    // показываем имя по id
    showName(id, name=null) {
        if (id === null) {
            return 'public';
        }
        if (id in this.state.names) {
            return this.state.names[id];
        }
        else {
            if (name != null) {
                // при поиске я уже знаю имя, но его надо запомнить
                this.setState(function(prevState, props){
                    prevState.names[id] = name;
                    return {names: prevState.names}
                });
                return name;
            }
            // иначе отправляем запрос на сервер
            if (!(id in this.showed_names)) {
                // запоминаем этот ID и больше не спрашиваем сервер про него
                // конечно спасает не на 100% ну и ладно
                this.showed_names[id] = '###'; // можно засунуть что угодно
                // отправляем запрос, при его выполнении состояние изменится и все перерисуется
                authenticationService.getUserInfo(id)
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
        // надо проверить если сообщений нет
        this.setState({ searchResults: data});
    }

    handleIncomingMessage(data) {
        // почему то не меняется надпись с последним сообщением?
        // нам нужно из строки получить json
        data = JSON.parse(data)
        // Примечание: имена полей начинаются с большой буквы
        // если на webSocket получаем сообщение от нас же, то игнорируем его
        if (data.User !== this.state.myId) {
            this.setState(
                function(prevState, props) {
                    // обновляем список обсуждений
                    var findCondition = function(element, index, array) {
                        if (element.id == data.ConversationId) {
                            return true;
                        }
                        return false;
                    };
                    var findResult = prevState.chats.find(findCondition);
                    // надо узнать это личное сообщение или из общего чата
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
                        // если это новое обсуждение, то добавляем его в список chats
                        prevState.chats = [chatElement].concat(prevState.chats)
                    }
                    else {
                        // на первое место ставим обсуждение куда пришло сообщение
                        var findResultIndex = prevState.chats.findIndex(findCondition);
                        prevState.chats.splice(findResultIndex, 1);
                        prevState.chats = [chatElement].concat(prevState.chats);
                    }
                    // если сообщение пришло на активное обсуждение
                    // то надо изменить и список сообщений
                    // надо чтобы null==null выполнялось
                    if (chatName == prevState.activeChatName) {
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
                        <SearchPanel 
                            sendQuery={this.sendQuery} />
                        { this.state.query === '' ?
                            (
                            <ConversationList
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
                            showName={this.showName} />
                        <SendMessageForm
                            sendMessage={this.sendMessage} />
                    </div>
                </div>
                <Websocket url={authenticationService.API_WEBSOCKET()}
                    onMessage={this.handleIncomingMessage}/>
            </div>
        );
    }
}


export default Chat