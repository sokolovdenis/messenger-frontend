import {DO_SIGN_OUT} from "../reducers/auth";

const SIGN_OUT = 'SIGN_OUT';

const onSignOut = store => next => action => {
    if (action.type !== SIGN_OUT) {
        return next(action);
    }

    localStorage.clear();

    store.dispatch({
        type: DO_SIGN_OUT,
        payload: {
            token: null,
            expires: null,
        },
    });
};

export const onSignOutAction = () => ({type: SIGN_OUT});

export default onSignOut;
