import { combineReducers } from 'redux';
import auth from './auth';
import recvChatList from './recvChatList';
import recvMessageList from './recvMessageList';
import recvUserList from './recvUserList';
import sendMessage from './sendMessage';

const reducer = combineReducers({
    auth,
    recvChatList,
    recvMessageList,
    recvUserList,
    sendMessage,
});

export default reducer;
