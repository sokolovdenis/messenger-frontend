import { combineReducers } from 'redux';
import auth from './auth';
import recvChatList from './recvChatList';

const reducer = combineReducers({
    auth,
    recvChatList,
});

export default reducer;
