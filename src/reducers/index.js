import { combineReducers } from 'redux';
import auth from './auth';
import recvChatList from './recvChatList';
import recvMessageList from './recvMessageList';

const reducer = combineReducers({
    auth,
    recvChatList,
    recvMessageList,
});

export default reducer;
