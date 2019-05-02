import {AUTH_FAILURE, AUTH_SUCCESS} from "../reducers/auth";
import {getErrorMessage} from '../utils/getErrorMessage'
import {apiRequest} from "../utils/apiRequest";
import api from '../constants/api';

const AUTH = 'AUTH';

const onAuth = store => next => action => {
    if (action.type !== AUTH) {
        return next(action);
    }

    const {request, parameters} = action.payload;

    apiRequest(request, 'POST', null, parameters, ({token, expires}) => {
        apiRequest(api.getSelf, 'GET', token, null, ({id}) => {
            localStorage.setItem("token", token);
            localStorage.setItem("expires", expires);
            localStorage.setItem("me", id);
            store.dispatch({
                type: AUTH_SUCCESS,
                payload: {
                    token,
                    expires,
                    error: null,
                },
            });
        });
    }, response => {
        store.dispatch({
            type: AUTH_FAILURE,
            payload: {
                token: null,
                expires: null,
                error: getErrorMessage(response),
            }
        })
    });
};

export const onAuthAction = (payload) => ({
    type: AUTH,
    payload
});

export default onAuth;
