import {createAction, createReducer} from 'redux-act';

export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
const sendMessageSuccessAction = createAction(SEND_MESSAGE_SUCCESS);

export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';
const sendMessageFailureAction = createAction(SEND_MESSAGE_FAILURE);

const sendMessage = createReducer({
    [sendMessageSuccessAction]: (state, payload) => ({ ...state, ...payload}),
    [sendMessageFailureAction]: (state, payload) => ({ ...state, ...payload}),
}, {});

export default sendMessage;
