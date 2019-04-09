import {createAction, createReducer} from 'redux-act';

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccessAction = createAction(AUTH_SUCCESS);

export const AUTH_FAILURE = 'AUTH_FAILURE';
export const authFailureAction = createAction(AUTH_FAILURE);

const onAuth = createReducer({
    [authSuccessAction]: (state, payload) => ({ ...state, ...payload}),
    [authFailureAction]: (state, payload) => ({ ...state, ...payload}),
}, {});

export default onAuth;
