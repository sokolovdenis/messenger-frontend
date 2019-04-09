import api from "../constants/api";
import {AUTH_FAILURE, AUTH_SUCCESS} from "../reducers/onAuth";

export const AUTH = 'AUTH';

const auth = store => next => action => {
    if (action.type !== AUTH) {
        return next(action);
    }

    fetch(api.signIn, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(action.payload)
    }).then(response =>
        response.status === 200
            ? response.json()
            : Promise.reject(response.text())
    ).then(({token, expires}) => {
        store.dispatch({
            type: AUTH_SUCCESS,
            payload: {
                token,
                expires,
            },
        });
    }).catch(error => {
        error.then(message => {
            store.dispatch({
                type: AUTH_FAILURE,
                payload: {error: message,}
            })
        })
    });
};

export const authAction = (payload) => ({
    type: AUTH,
    payload
});

export default auth;
