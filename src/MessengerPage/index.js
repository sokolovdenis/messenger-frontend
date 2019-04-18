import React from 'react';
import Chat from './Chat/index'
import ContactList from './ContactList'
import { HttpRequestGetMessage, HttpRequestGetConversations, HttpRequestUserInfo } from '../HttpRequest'
import FindUsersPopup from './FindUsersPopup'
class MessengerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                currentConversionId: 'public',
                conversations: [],
                userNames: [], 
                messages: [],
                //наверное три массива выше нужно объединить в один объект. Нужно это сделать и мапить их друг на друга.
                showPopup: false,
                connected: false
            }

        this.newConversation = this.newConversation.bind(this);
        this.getConversations = this.getConversations.bind(this);
        this.getMessage = this.getMessage.bind(this);
        this.getOnlyNewMessage = this.getOnlyNewMessage.bind(this);
        this.getUserName = this.getUserName.bind(this);

        this.findConversionName = this.findConversionName.bind(this);
        this.togglePopup = this.togglePopup.bind(this)

        this.userInFindClickHandle = this.userInFindClickHandle.bind(this);
        let connString = "ws://messenger.westeurope.cloudapp.azure.com/socket/messages?token=" + this.props.token;

        this.socket = new WebSocket(connString);

        this.socket.onopen = () => {
            console.log('socket connected');
            this.setState({ connected: true });
        };
        this.socketEmit = this.socketEmit.bind(this);
        this.newSocketMessage = this.newSocketMessage.bind(this);
    }

    socketEmit() {
        if (this.state.connected) {
            console.log('сокет жив');
            this.socket.onmessage =
                ({ data }) => this.newSocketMessage(data);
        }
    }

    newSocketMessage(data) {
        let message = JSON.parse(data);
        console.log('newSocketMessage');
        console.log(message);
        console.log(this.props.thisUserId);
        console.log(message.User);
        console.log(this.state.currentConversionId);
        console.log(this.state.messages.length);
        if (message.User === this.props.thisUserId) {
            this.getOnlyNewMessage(this.state.currentConversionId, this.props.token, this.state.messages.length, 1);
            console.log('прило т.к. своё');
            return;
        }
        if (message.ConversationId === 'public') {
            if (this.state.currentConversionId === 'public') {
                this.getOnlyNewMessage(this.state.currentConversionId, this.props.token, this.state.messages.length, 1);
            }
        }
        else {
            if (message.User === this.state.currentConversionId) {
                this.getOnlyNewMessage(this.state.currentConversionId, this.props.token, this.state.messages.length, 1);
                console.log('прило т.к. ты в нужно чате');
            } else {
                console.log('прило но ты не в том чате');
                /* вновь получаем чаты */
                this.getConversations();
                /* Оповестить бы пользователя еще... */
            }
        }
    }


    componentDidMount() {
        this.getConversations();
        this.getMessage(this.state.currentConversionId, this.props.token);
        /* Все работало, а теперь пришли соккеты */
        this.timerID = setInterval(() => this.socketEmit(), 500);
    }
    /* найти имя пользователя */
    getUserName(userId) {
        HttpRequestUserInfo(userId, this.props.token)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    throw response;
                }
            })
            .then((data) => {
                /*this.setState({userName: data.name})*/
                this.setState(prevState => ({
                    userNames: [...prevState.userNames, data]
                }))
            })
            .catch((error) => {
                console.log(error);
                if (error.statusText === undefined) {
                    /* Явно вернулся не JSON */
                    console.log(error);
                    alert('При получении данных о пользователе произошла ошибка!');
                } else {
                    console.log(error);
                    alert('При получении данных о пользователе произошла ошибка!');
                }
            });
    }
    /* получить все чаты */
    getConversations() {
        HttpRequestGetConversations(this.props.token)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    throw response;
                }
            })
            .then((data) => {
                /* Желательно, чтобы публичный чат был сверху, а дальше по афавиту */
                /* Меняю NULL на '' т.к. она маленькая самая строка, как и этот костыль =) */
                data.sort((a, b) => (
                    (a.participant ? a.participant : '')
                    > b.participant) ? 1 :
                    ((b.participant > (a.participant ? a.participant : '')) ? -1 : 0));
                this.setState({ conversations: data });
                console.log(data);
                data.map(item => (
                    this.getUserName(item.participant ? item.participant : 'me')
                ))
            })
            .catch((error) => {
                console.log(error);
                if (error.statusText === undefined) {
                    /* Явно вернулся не JSON */
                    console.log(error);
                    alert('При получении данных о контактах произошла ошбка!');
                } else {
                    console.log(error);
                    alert('При получении данных о контактах произошла ошибка!');
                }
            });
    }

    /* сменили чат или начали новый через поиск, или из чата */
    newConversation(userId) {
        /* Нужно проверить, что у нас нет уже чата с данным пользователем*/
        if (userId) {
            let result = [];
            if (this.state.conversations) {
                result = this.state.conversations.filter(
                    item => item.participant === userId);
            }
            if (result.length === 0) {
                let newConversationObj =
                {
                    'participant': userId,
                    'id': userId,
                    'lastMessage':
                    {
                        'timestamp': '',
                        'content': 'нет сообщений',
                    }
                }
                //Нужно найти (вдруг новенький через поиск)
                this.getUserName(userId ? userId: 'me');
                this.setState(prevState => ({
                    conversations: [...prevState.conversations, newConversationObj]
                }))
            }
            this.setState({
                currentConversionId: userId ? userId : 'public'
            })
        }
        else {
            console.log('меняет текущий чат');
            this.setState({
                currentConversionId: userId ? userId : 'public'
            });
        }
        /*сообщения новой конверсии */
        this.getMessage(userId ? userId : 'public', this.props.token);
    }


    /*GET MESSAGE*/
    getMessage(conversionId, token, from, count) {
        HttpRequestGetMessage(conversionId, token, from, count)
            .then((response) => {
                if (response.status === 200) {
                    return response;
                }
                else {
                    alert('При получении сообщений произошла ошибка!');
                }
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log('пришли сообщения');
                console.log(data);
                this.setState({ messages: data });
                /////////////////////////////////////////////
                data.map(item => (
                    this.getUserName(item.user)
                )
                );

            }).catch(function (error) {
                console.log(error);
                alert('При получении сообщений произошла ошибка!');
            })
    }

    getOnlyNewMessage(conversionId, token, from, count) {
        HttpRequestGetMessage(conversionId, token, from, count)
            .then((response) => {
                if (response.status === 200) {
                    return response;
                }
                else {
                    alert('При получении сообщений произошла ошибка!');
                }
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log('пришли новые сообщения');
                //что бы data не запихался массивом в объект нужно ставить три точки, так оказывается комбаинется (джойнится)
                this.setState(prevState => ({
                    messages: [...prevState.messages, ...data]
                }))
                console.log(this.state.messages);
                /////////////////////////////////////////////
                data.map(item => (
                    this.getUserName(item.user)
                )
                );
                

            }).catch(function (error) {
                console.log(error);
                alert('При получении сообщений произошла ошибка!');
            })
    }



    /* окошко для поиска пользователей */
    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    userInFindClickHandle(userId, userName) {
        /* Сообщение самому себе ведет к ошибки 500 от сервера при получении конверсий */
        if (this.props.thisUserId !== userId)
            this.newConversation(userId, userName);
        else alert('Час с сами собой ведь не имеет смысла. Попробуйте использовать приложение "заметки" в Вашем смартфоне.');

        this.togglePopup();
    }

    findConversionName(userId) {
        if (!userId || userId === 'public') return 'Публичный чат'

        let result = [];
        if (this.state.userNames)
            result = this.state.userNames.filter(item => item.id === userId);

        if (result.length === 0) {
            return 'поиск...';
        }
        else {
            return result[0].name;
        }
    }

    render() {
        return (
            <div className="MessengerPage">
                <div className="contactList">
                    <h1>Чаты</h1>
                    <div className="buttonFindUserPopup"
                        onClick={this.togglePopup.bind(this)}
                    >
                        Поиск</div>
                    {this.state.showPopup ?
                        <FindUsersPopup
                            closePopup={this.togglePopup.bind(this)} /* попробую прицепить сразу */
                            token={this.props.token}

                            userInFindClickHandle={this.userInFindClickHandle}
                        />
                        : null
                    }

                    <ContactList
                        token={this.props.token}
                        conversations={this.state.conversations}
                        newConversation={this.newConversation}
                        userNames={this.state.userNames}
                    />
                </div>
                <div className="chatControl">
                    <Chat token={this.props.token}
                        thisUserId={this.props.thisUserId}
                        conversionId={this.state.currentConversionId}
                        conversionName={this.findConversionName(this.state.currentConversionId)}
                        newConversation={this.newConversation}
                        addNewUserName={this.addNewUserName}
                        userNames={this.state.userNames}
                        messages={this.state.messages}
                    />
                </div>
            </div>
        );
    }
}

export default MessengerPage;