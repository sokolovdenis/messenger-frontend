import { combineReducers } from 'redux';
import auth from './auth';
import getUserById from "./getUserById";
import recvChatList from './recvChatList';
import recvMessageList from './recvMessageList';
import recvUserList from './recvUserList';
import sendMessage from './sendMessage';
import recvNewMessage from './recvNewMessage';

const reducer = combineReducers({
    auth,
    recvChatList,
    recvMessageList,
    recvNewMessage,
    recvUserList,
    sendMessage,
    getUserById,
});

export default reducer;
