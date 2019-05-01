import {GET_USER_BY_ID_SUCCESS, GET_USER_BY_ID_STARTED} from "../reducers/getUserById";
import {apiRequest} from "../utils/apiRequest";

const GET_USER_BY_ID = 'GET_USER_BY_ID';

const onGetUserById = store => next => action => {
    if (action.type !== GET_USER_BY_ID) {
        return next(action);
    }

    const {request, id, token} = action.payload;

    const idToNameStarted = store.getState().getUserById.idToNameStarted;

    if (idToNameStarted.includes(id)) {
        return;
    }

    store.dispatch({
        type: GET_USER_BY_ID_STARTED,
        payload: { id },
    });

    apiRequest(request(id), 'GET', token, null, ({name}) => {
        store.dispatch({
            type: GET_USER_BY_ID_SUCCESS,
            payload: {
                id,
                name,
                error: null,
            },
        });
    }, () => {});
};

export const onGetUserByIdAction = (payload) => ({
    type: GET_USER_BY_ID,
    payload
});

export default onGetUserById;
