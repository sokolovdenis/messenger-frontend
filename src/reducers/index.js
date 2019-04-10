import { combineReducers } from 'redux';
import auth from './auth';
import recvChatList from './recvChatList';
import recvMessageList from './recvMessageList';
import recvUserList from './recvUserList';

const reducer = combineReducers({
    auth,
    recvChatList,
    recvMessageList,
    recvUserList,
});

export default reducer;
