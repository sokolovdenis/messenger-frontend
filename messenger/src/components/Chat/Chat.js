import React, { Component } from 'react';
import ConversationList from './ConversationList/ConversationList'
import MessageList from './MessageList/MessageList';
import SendMessageForm from './SendMessageForm/SendMessageForm';
import SearchPanel from './SearchPanel/SearchPanel';
import { authenticationService } from '../../services/Api/Api';
import './Chat.css';
import Header from './Header/Header';


class Chat extends Component {
	constructor(props) {
        super(props);
        // console.log(authenticationService.getCurrentUser());
        this.state = {
            activeChatId: 'public',  // активная чат комната
            messages: [],  // сообщения в активной чат комнате
            chats: [],  // список чат комнат
            myId: null, // Id залогиненного пользователя
            myName: "",  // Имя залогиненного пользователя
            names: {}, // словарь id:имя
        };

        this.showConversations  = this.showConversations.bind(this);
        this.showMessages = this.showMessages.bind(this);
        this.showPostedMessage = this.showPostedMessage.bind(this);
        this.showMyUserName = this.showMyUserName.bind(this);
        this.showName = this.showName.bind(this);
        this.selectConversation  = this.selectConversation.bind(this);
        this.showErrorMessage = this.showErrorMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }
    
    componentDidMount() {    
        // загружаем список чатов
        authenticationService.getConversations()
            .then(this.showConversations)
            .catch(this.showErrorMessage);
        // выбираем и загружаем диалог по умолчанию
        this.selectConversation(this.state.activeChatId);
        // загружаем данные о себе
        authenticationService.getMe()
            .then(this.showMyUserName)
            .catch(this.setAlert)
    }

    showErrorMessage(msg) {
        console.log(msg);
    }

    selectConversation(id) {
        authenticationService.getPublicMessages()
            .then(this.showMessages)
            .catch(this.showErrorMessage);
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
        // console.log(data);
        this.setState({ chats: data });
    }

    showMessages(data) {
        // console.log(data);
        this.setState({ messages: data });
    }

    showMyUserName(data) {
        this.setState({ myName: data.name, myId: data.id });
    }

    sendMessage(message) {
        // отправляем сообщение на сервер .
        authenticationService.postPublicMessages(message)
            .then(this.showPostedMessage)
            .catch(this.showErrorMessage);
    }

    showPostedMessage(data) {
        var messages = this.state.messages;

        // обновляем обсуждения
        
        messages.push(data);

        this.setState({ messages: messages});
    }

    // показываем имя по id
    showName(id) {
        if (id in this.state.names) {
            return this.state.names[id];
        }
        else {
            var newNames = this.state.names;
            // отправляем запрос на сервер
            if (!(id in newNames)) {
                // запоминаем этот ID и больше не спрашиваем сервер про него
                newNames[id] = '###';
                this.setState({names: newNames});
                // отправляем запрос, при его выполнении состояние изменится и все перерисуется
                authenticationService.getUserInfo(id)
                    .then(data => {
                        var newNames = this.state.names;
                        newNames[data.id] = data.name;
                        this.setState({names: newNames});
                    })
                    .catch(this.showErrorMessage)
            }
            return '###';
        }
    }


    render() {
        return (
            <div>
                <Header name={this.state.myName} logout={this.props.logout} />
                <div className="messenger">
                    <div className="inbox-people">
                        <SearchPanel/>
                        <ConversationList
                            chats={this.state.chats} />
                    </div>
                    <div className="mesgs">
                        <MessageList 
                            userId={this.state.myId}
                            activeChatId={this.state.chatId}
                            messages={this.state.messages}
                            showName={this.showName} />
                        <SendMessageForm
                            sendMessage={this.sendMessage} />
                    </div>
                </div>
            </div>
        );
    }
}


export default Chat