import {RECV_USER_LIST_SUCCESS, RECV_USER_LIST_FAILURE} from "../reducers/recvUserList";
import {getErrorMessage} from '../utils/getErrorMessage'
import {addPathAndQueries} from "../utils/addPathAndQueries";
import {apiRequest} from "../utils/apiRequest";

const RECV_USER_LIST = 'RECV_USER_LIST';

const onRecvUserList = store => next => action => {
    if (action.type !== RECV_USER_LIST) {
        return next(action);
    }

    const {request, query, token} = action.payload;

    if (query === '') {
        store.dispatch({
            type: RECV_USER_LIST_SUCCESS,
            payload: {
                userList: [],
                message: null,
                error: null,
            }
        });

        return;
    }

    apiRequest(addPathAndQueries(request, null, [{param: "query", query}]),
        'GET', token, null, userList => {
            store.dispatch({
                type: RECV_USER_LIST_SUCCESS,
                payload: {
                    userList,
                    message: userList.length > 0 ? null : 'По вашему запросу ничего не нашлось',
                    error: null,
                },
            });
        }, response => {
            store.dispatch({
                type: RECV_USER_LIST_FAILURE,
                payload: {
                    userList: [],
                    error: getErrorMessage(response),
                }
            })
        });
};

export const onRecvUserListAction = (payload) => ({
    type: RECV_USER_LIST,
    payload
});

export default onRecvUserList;
