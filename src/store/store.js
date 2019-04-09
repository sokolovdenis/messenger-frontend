import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from '../reducers';
import onAuth from '../middlewares/onAuth';
import onSignOut from "../middlewares/onSignOut";
import onRecvChatList from "../middlewares/onRecvChatList";

const store = createStore(
    reducer,
    applyMiddleware(onAuth, onSignOut, onRecvChatList, thunk)
);

export default store;
