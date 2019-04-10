import {createAction, createReducer} from 'redux-act';

export const RECV_USER_LIST_SUCCESS = 'RECV_USER_LIST_SUCCESS';
const recvUserListSuccessAction = createAction(RECV_USER_LIST_SUCCESS);

export const RECV_USER_LIST_FAILURE = 'RECV_USER_LIST_FAILURE';
const recvUserListFailureAction = createAction(RECV_USER_LIST_FAILURE);

const recvUserList = createReducer({
    [recvUserListSuccessAction]: (state, payload) => ({ ...state, ...payload}),
    [recvUserListFailureAction]: (state, payload) => ({ ...state, ...payload}),
}, {});

export default recvUserList;
