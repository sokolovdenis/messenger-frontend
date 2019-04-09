import {createAction, createReducer} from 'redux-act';

export const RECV_CHAT_LIST_SUCCESS = 'RECV_CHAT_LIST_SUCCESS';
const recvChatListSuccessAction = createAction(RECV_CHAT_LIST_SUCCESS);

export const RECV_CHAT_LIST_FAILURE = 'RECV_CHAT_LIST_FAILURE';
const recvChatListFailureAction = createAction(RECV_CHAT_LIST_FAILURE);

const recvChatList = createReducer({
    [recvChatListSuccessAction]: (state, payload) => ({ ...state, ...payload}),
    [recvChatListFailureAction]: (state, payload) => ({ ...state, ...payload}),
}, {});

export default recvChatList;
