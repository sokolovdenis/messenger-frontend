import {RECV_USER_LIST_SUCCESS, RECV_USER_LIST_FAILURE} from "../reducers/recvUserList";
import {getErrorMessage} from '../utils/getErrorMessage'
import {addPathAndQueries} from "../utils/addPathAndQueries";

const RECV_USER_LIST = 'RECV_USER_LIST';

const onRecvUserList = store => next => action => {
    if (action.type !== RECV_USER_LIST) {
        return next(action);
    }

    const {request, query, token} = action.payload;

    fetch(addPathAndQueries(request, null, [{param: "query", query}]), {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    }).then(response =>
        response.status === 200
            ? response.json()
            : Promise.reject(response.text())
    ).then(userList => {
        store.dispatch({
            type: RECV_USER_LIST_SUCCESS,
            payload: {
                userList,
                error: null,
            },
        });
    }).catch(promise => {
        promise.then(response => {
            store.dispatch({
                type: RECV_USER_LIST_FAILURE,
                payload: {
                    userList: [],
                    error: getErrorMessage(response),
                }
            })
        });
    });
};

export const onRecvUserListAction = (payload) => ({
    type: RECV_USER_LIST,
    payload
});

export default onRecvUserList;
