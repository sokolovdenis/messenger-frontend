import {AUTH_FAILURE, AUTH_SUCCESS} from "../reducers/auth";

const AUTH = 'AUTH';

const getErrorMessage = response => {
    try {
        const {errors} = JSON.parse(response);

        let messages = [];

        for (let key in errors) {
            if (errors.hasOwnProperty(key)) {
                messages = [...messages, ...errors[key]];
            }
        }

        return messages.join(' ');
    } catch {
        return response;
    }
};

const onAuth = store => next => action => {
    if (action.type !== AUTH) {
        return next(action);
    }

    const {request, parameters} = action.payload;

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
                error: null,
            },
        });
    }).catch(promise => {
        promise.then(response => {
            store.dispatch({
                type: AUTH_FAILURE,
                payload: {
                    token: null,
                    expires: null,
                    error: getErrorMessage(response),
                }
            })
        });
    });
};

export const onAuthAction = (payload) => ({
    type: AUTH,
    payload
});

export default onAuth;
