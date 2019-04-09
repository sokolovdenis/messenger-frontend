import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from '../reducers';
import onAuth from '../middlewares/onAuth';
import onSignOut from "../middlewares/onSignOut";
import onRecvChatList from "../middlewares/onRecvChatList";
import onRecvMessageList from "../middlewares/onRecvMessageList";

const store = createStore(
    reducer,
    applyMiddleware(
        onAuth,
        onSignOut,
        onRecvChatList,
        onRecvMessageList,
        thunk
    )
);

export default store;
