import {createAction, createReducer} from 'redux-act';

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccessAction = createAction(AUTH_SUCCESS);

export const AUTH_FAILURE = 'AUTH_FAILURE';
export const authFailureAction = createAction(AUTH_FAILURE);

export const DO_SIGN_OUT = 'DO_SIGN_OUT';
export const signOutAction = createAction(DO_SIGN_OUT);

const auth = createReducer({
    [authSuccessAction]: (state, payload) => ({ ...state, ...payload}),
    [authFailureAction]: (state, payload) => ({ ...state, ...payload}),
    [signOutAction]: (state, payload) => ({ ...state, ...payload}),
}, {});

export default auth;
