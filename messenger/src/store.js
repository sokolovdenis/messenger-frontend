import {OrderedMap} from "immutable";
import Service from './service'

export default class Store {

    constructor(appComponent){
        this.app = appComponent;
        this.service = new Service();
        this.prevActiveChannel = null;
        this.messages = new OrderedMap();
        this.channels = new OrderedMap();
        this.activeChannelId = null;

        this.token = this.getTokenFromLocalStore();
        this.user =  this.getUserFromLocalStorage();
        this.from = 0;
        this.count = 10;
        this.needToLoadMessages = false;

        this.users = new OrderedMap();
        this.search = {
            users: new OrderedMap(),
        }
    }
    loadUserAvatar(id){
        return `https://api.adorable.io/avatars/100/${id}.png`
    }
    getWebSocket() {
        return this.service.getWebSocket(this.token);
    }

    startSearchUsers(q = "") {
        if(q===''){
            return;
        }
        this.search.users = this.search.users.clear();
        this.service.findUser(this.token, q).then((users)=>{
            for (let i in users){
                const searchedUser={
                    name: users[i].name,
                    id: users[i].id,
                    avatar: this.loadUserAvatar(users[i].id),
                }
                this.users = this.users.set(searchedUser.id, searchedUser);
                this.search.users = this.search.users.set(searchedUser.id, searchedUser);
            }
            this.update();
        }).catch((err) => {
        });
    }
    getSearchUsers() {
        return this.search.users.valueSeq();
    }

    startNewChannel(userId){
        let channel = this.channels.find((a) => {return a.participant === userId});
        if (!channel){
            channel={
                id: 'new',
                lastMessage:{
                    content:'',
                },
                participant:userId,
            };
            this.channels = this.channels.set(channel.id, channel);
        }
        this.setActiveChannelId(channel.id);
        //this.app.state.createNewChannel = false;
        this.update();
    }

    setUserToken(accessToken){
        this.token = accessToken;
        localStorage.setItem('token', JSON.stringify(accessToken));

    }
    getTokenFromLocalStore(){
        if(this.token){
            return this.token;
        }
        let token = null;
        const data = localStorage.getItem('token');
        if(data){
            try{
                token = JSON.parse(data);
            }
            catch(err){
                console.log(err);
            }
        }
        return token;
    }

    getUserFromLocalStorage(){
        let user = null;
        const data = localStorage.getItem('me');
        try{
            user = JSON.parse(data);
        }
        catch(err){
            console.log(err);
        }
        if(user){
            this.saveChannels().then((response) => {
                this.update();
            }).catch(err => {
            });
            this.saveUsersFromPublicChannel().then((response) => {
                this.update();
            }).catch(err => {
            });
        }
        return user;
    }

    saveCurrentUserToLocalStorage(){
        localStorage.setItem('me', JSON.stringify(this.user));
        const userId = `${this.user.id}`;
        this.users = this.users.set(userId, this.user);
    }

    setCurrentUser(token){
        this.service.getMe(token).then((response) => {
            const user = {
                name: response.name,
                id: response.id,
                avatar: this.loadUserAvatar(response.id),
            };
            this.user = user;
            this.saveCurrentUserToLocalStorage();
            this.update();
        }).catch(err => {
            this.signOut();
        });
    }
    signUp(name, login, password){
        return this.service.postSignUp(name, login, password)
            .catch((err) => {
            console.log("", err);
        })
    }

    signOut(){
        const userId = this.user.id;
        this.user = null;
        localStorage.removeItem('me');
        localStorage.removeItem('token');

        if(userId){
            this.users = this.users.remove(userId);
        }
        this.channels = this.channels.clear();
        this.messages = this.messages.clear();

        this.update();
    }
    signIn(userLogin, password) {
        return this.service.postSignIn(userLogin, password).then((user) => {
            sessionStorage.setItem('token', user.token);
            sessionStorage.setItem('expires', user.expires);
            this.setCurrentUser(sessionStorage.getItem('token'));
            this.setUserToken(sessionStorage.getItem('token'));
            this.saveChannels().then((response) => {
                this.update();
            }).catch(err => {
            });
        })
    }

    saveUsersFromPublicChannel() {
        return this.service.getPublicMessages(this.token).then((response) => {
            for (let i in response){
                const user = response[i].user;
                this.getUserInfo(user);
            }
        });
    }

    saveUser(userId){
        if(!userId){
            return;
        }
        if (this.users.get(userId)){
            return;
        }
        this.service.getUser(this.token, userId).then((response) => {
            const newUser = {
                name: response.name,
                id: response.id,
                avatar: this.loadUserAvatar(response.id),
            };
            this.users = this.users.set(newUser.id, newUser);
            this.update();
        });
    }
    getUserInfo(userId){
        if(!userId){
            return null;
        }
        if (this.users.has(userId)){
            return this.users.get(userId);
        } else {
            this.users = this.users.set(userId, null);
            this.saveUser(userId);
            return null;
        }
    }
    getCurrentUser(){
        return this.user;
    }
    handleScroll(){
        if(this.needToLoadMessages){
            this.needToLoadMessages = false;
            this.getPrivateMessages(this.channels.get(this.activeChannelId).participant, this.from, this.count).then((response) => {
                if(response.length === this.count){
                    this.from = this.from + this.count;
                    this.needToLoadMessages = true;
                } else {
                    this.from = 0;
                    this.needToLoadMessages = false;
                }
                this.update();
            }).catch(err => {});
        }
    }
    saveMessagesForActiveChannel(){
        const channelId = this.activeChannelId;
        if (channelId !== this.prevActiveChannel) {
            this.prevActiveChannel = channelId;
            this.from = 0;
            this.needToLoadMessages = false;
            this.messages = this.messages.clear();
            if (channelId === 'public') {
                this.getPublicMessages().then((response) => {
                    this.update();
                }).catch(err => {});
            } else {
                this.getPrivateMessages(this.channels.get(this.activeChannelId).participant, this.from, this.count).then((response) => {
                    if(response.length === this.count){
                        this.from = this.from + this.count;
                        this.needToLoadMessages = true;
                    }
                    this.update();
                }).catch(err => {});

            }
        }
    }
    setActiveChannelId(channelId){
        this.activeChannelId = channelId;
        this.saveMessagesForActiveChannel();
        if(channelId !== 'new'){
            this.channels = this.channels.remove('new');
        }
        //this.update();
    }
    getActiveChannel(){
        const channel = this.activeChannelId ? this.channels.get(this.activeChannelId) : this.channels.first();
        if (channel && !this.activeChannelId){
            this.setActiveChannelId(channel.id);
        }
        return channel;
    }
    addMessage(content){
        if(this.activeChannelId === 'public') {
            this.service.postPublicMessages(this.token, content).then((response) => {
                let newMessage = {
                    id: response.id,
                    conversationId: response.conversationId,
                    content: response.content,
                    user: response.user,
                    timestamp: response.timestamp,
                    me: response.user === this.user.id,
                };
                this.messages = this.messages.set(newMessage.id, newMessage);
                this.channels.get(response.conversationId).lastMessage = newMessage;
                this.update();
            });
        } else {
            this.service.postPrivateMessages(this.token, this.channels.get(this.activeChannelId).participant, content).then((response) => {
                let newMessage = {
                    id: response.id,
                    conversationId: response.conversationId,
                    content: response.content,
                    user: response.user,
                    timestamp: response.timestamp,
                    me: response.user === this.user.id,
                };
                this.messages = this.messages.set(newMessage.id, newMessage);
                if(this.activeChannelId === 'new'){
                    let channel = this.channels.get('new');
                    channel.id = response.conversationId;
                    this.channels = this.channels.remove('new');
                    this.channels = this.channels.set(channel.id, channel);
                    this.setActiveChannelId(channel.id);
                }
                this.channels.get(response.conversationId).lastMessage = newMessage;
                this.update();
            });
        }
    }
    addIncomingMessage(data){
        data = JSON.parse(data);
        if (data.User !== this.user.id) {
            let channel = this.channels.find((a) =>{return a.id === data.ConversationId});
            const participant = data.ConversationId === 'public' ? null : data.User;
            const newMessage = {
                conversationId: data.ConversationId,
                timestamp: data.Timestamp,
                user: data.User,
                content: data.Content,
                id: data.Id
            };
            if (!channel) {
                channel = {
                    lastMessage: newMessage,
                    participant: participant,
                    id: data.ConversationId,
                };
                this.channels = this.channels.set(channel.id, channel);
                this.update();
            } else {
                this.channels.get(channel.id).lastMessage = newMessage;
                this.update();
            }
            if (channel.id === this.activeChannelId) {
                const message = channel.lastMessage;
                this.messages = this.messages.set(message.id, message);
                this.update();
            }
        }
    }
    getPublicMessages(){
        return this.service.getPublicMessages(this.token).then((response) => {
            for (let i in response){
                let newMessage = {
                    id: response[i].id,
                    conversationId: response[i].conversationId,
                    content: response[i].content,
                    user: response[i].user,
                    timestamp: response[i].timestamp,
                    me: response[i].user === this.user.id,
                };
                this.messages = this.messages.set(newMessage.id, newMessage);
            }
        });
    }
    getPrivateMessages(user, from, count){
        return this.service.getPrivateMessages(this.token, user, from, count).then((response) =>{
            for (let i in response) {
                let newMessage = {
                    id: response[i].id,
                    conversationId: response[i].conversationId,
                    content: response[i].content,
                    user: response[i].user,
                    timestamp: response[i].timestamp,
                    me: response[i].user === this.user.id,
                };
                this.messages = this.messages.set(newMessage.id, newMessage);
            }
            return response;
        });
    }
    getMessagesFromChannel(){
        let messages = this.messages.sort((a, b) => {
            return a.timestamp > b.timestamp ? 1 : -1;
        });

        return messages.valueSeq();
    }
    saveChannels(){
        return this.service.getConversations(this.token)
            .then((response) => {
                for (let i in response){
                    let newChannel = {
                        id: response[i].id,
                        lastMessage: response[i].lastMessage,
                        participant: response[i].participant,
                    };
                    newChannel.lastMessage.me = this.user.id === newChannel.lastMessage.user;
                    if (response[i].lastMessage) {
                        this.saveUser(response[i].participant);
                    }
                    this.channels = this.channels.set(newChannel.id, newChannel);
                }
            })
    }
    getChannels(){
        let channels = this.channels.sort((a, b) => {
            return a.lastMessage.timestamp < b.lastMessage.timestamp ? 1 : -1;
        });

        return channels.valueSeq();
    }
    update(){
        this.app.forceUpdate();
    }
}