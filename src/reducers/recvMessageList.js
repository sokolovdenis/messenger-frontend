import {createAction, createReducer} from 'redux-act';

export const RECV_MESSAGE_LIST_SUCCESS = 'RECV_MESSAGE_LIST_SUCCESS';
const recvMessageListSuccessAction = createAction(RECV_MESSAGE_LIST_SUCCESS);

export const RECV_MESSAGE_LIST_FAILURE = 'RECV_MESSAGE_LIST_FAILURE';
const recvMessageListFailureAction = createAction(RECV_MESSAGE_LIST_FAILURE);

const recvMessageList = createReducer({
    [recvMessageListSuccessAction]: (state, payload) => ({ ...state, ...payload}),
    [recvMessageListFailureAction]: (state, payload) => ({ ...state, ...payload}),
}, {});

export default recvMessageList;
