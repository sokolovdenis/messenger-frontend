import api from "../constants/api";
import {SIGN_UP_FAILURE, SIGN_UP_SUCCESS} from "../reducers/onSignUp";

export const SIGN_IN = 'SIGN_IN';

const signIn = store => next => action => {
    if (action.type !== SIGN_IN) {
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

export const signInAction = (payload) => ({
    type: SIGN_IN,
    payload
});

export default signIn;
