import {createReducer, createAction} from 'redux-act';

export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const signUpSuccessAction = createAction(SIGN_UP_SUCCESS);

export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const signUpFailureAction = createAction(SIGN_UP_FAILURE);

const onSignUp = createReducer({
    [signUpSuccessAction]: (state, payload) => ({ ...state, ...payload}),
    [signUpFailureAction]: (state, payload) => ({ ...state, ...payload}),
}, {});

export default onSignUp;
