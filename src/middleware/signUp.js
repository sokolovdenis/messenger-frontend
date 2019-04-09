import api from '../constants/api'
import {SIGN_UP_SUCCESS, SIGN_UP_FAILURE} from "../reducers/onSignUp";

export const SIGN_UP = 'SIGN_UP';

const signUp = store => next => action => {
    if (action.type !== SIGN_UP) {
        return next(action);
    }

    fetch(api.signUn, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(action.payload)
    }).then(response =>
        response.status === 200
            ? response.json()
            : Promise.reject(response.text())
    ).then(payload => {
        store.dispatch({
            type: SIGN_UP_SUCCESS,
            payload
        });
    }).catch(error => {
        error.then(payload => {
            store.dispatch({
                type: SIGN_UP_FAILURE,
                payload
            })
        })
    });
};

export const signUpAction = (payload) => ({
    type: SIGN_UP,
    payload
});

export default signUp;
