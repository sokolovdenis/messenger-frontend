import {createAction, createReducer} from 'redux-act';

export const RECV_NEW_MESSAGE_SUCCESS = 'RECV_NEW_MESSAGE_SUCCESS';
const recvNewMessageSuccessAction = createAction(RECV_NEW_MESSAGE_SUCCESS);

export const RECV_NEW_MESSAGE_FAILURE = 'RECV_NEW_MESSAGE_FAILURE';
const recvNewMessageFailureAction = createAction(RECV_NEW_MESSAGE_FAILURE);

const recvNewMessage = createReducer({
    [recvNewMessageSuccessAction]: (state, payload) => ({ ...state, ...payload}),
    [recvNewMessageFailureAction]: (state, payload) => ({ ...state, ...payload}),
}, {});

export default recvNewMessage;
