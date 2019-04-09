import api from "../constants/api";
import {AUTH_FAILURE, AUTH_SUCCESS} from "../reducers/auth";

export const AUTH = 'AUTH';

const onAuth = store => next => action => {
    if (action.type !== AUTH) {
        return next(action);
    }

    const { request, parameters} = action.payload;

    fetch(request, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(parameters)
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

export const onAuthAction = (payload) => ({
    type: AUTH,
    payload
});

export default onAuth;
