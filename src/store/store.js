import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from '../reducers';
import onAuth from '../middlewares/onAuth';
import onSignOut from "../middlewares/onSignOut";
import onRecvChatList from "../middlewares/onRecvChatList";
import onRecvMessageList from "../middlewares/onRecvMessageList";
import onRecvUserList from "../middlewares/onRecvUserList";
import onSendMessage from "../middlewares/onSendMessage";
import onRecvNewMessage from "../middlewares/onRecvNewMessage";
import onGetUserById from "../middlewares/onGetUserById";

const store = createStore(
    reducer,
    applyMiddleware(
        onAuth,
        onSignOut,
        onRecvChatList,
        onRecvMessageList,
        onRecvUserList,
        onSendMessage,
        onRecvNewMessage,
        onGetUserById,
        thunk
    )
);

export default store;
