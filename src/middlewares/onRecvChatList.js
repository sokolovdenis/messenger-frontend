import {RECV_CHAT_LIST_SUCCESS, RECV_CHAT_LIST_FAILURE} from "../reducers/recvChatList";
import {getErrorMessage} from '../utils/getErrorMessage'

const RECV_CHAT_LIST = 'RECV_CHAT_LIST';

const onRecvChatList = store => next => action => {
    if (action.type !== RECV_CHAT_LIST) {
        return next(action);
    }

    const {request, token} = action.payload;

    fetch(request, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${token}`
        },
    }).then(response =>
        response.status === 200
            ? response.json()
            : Promise.reject(response.text())
    ).then(chatList => {
        store.dispatch({
            type: RECV_CHAT_LIST_SUCCESS,
            payload: {
                chatList,
                error: null,
            },
        });
    }).catch(promise => {
        promise.then(response => {
            store.dispatch({
                type: RECV_CHAT_LIST_FAILURE,
                payload: {
                    chatList: [],
                    error: getErrorMessage(response),
                }
            })
        });
    });
};

export const onRecvChatListAction = (payload) => ({
    type: RECV_CHAT_LIST,
    payload
});

export default onRecvChatList;
