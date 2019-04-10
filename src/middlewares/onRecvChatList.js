import {RECV_CHAT_LIST_SUCCESS, RECV_CHAT_LIST_FAILURE} from "../reducers/recvChatList";
import {getErrorMessage} from '../utils/getErrorMessage'
import {apiRequest} from "../utils/apiRequest";

const RECV_CHAT_LIST = 'RECV_CHAT_LIST';

const onRecvChatList = store => next => action => {
    if (action.type !== RECV_CHAT_LIST) {
        return next(action);
    }

    const {request, token} = action.payload;

    apiRequest(request, 'GET', token, null, chatList => {
        store.dispatch({
            type: RECV_CHAT_LIST_SUCCESS,
            payload: {
                chatList,
                error: null,
            },
        });
    }, response => {
        store.dispatch({
            type: RECV_CHAT_LIST_FAILURE,
            payload: {
                chatList: [],
                error: getErrorMessage(response),
            }
        })
    });
};

export const onRecvChatListAction = (payload) => ({
    type: RECV_CHAT_LIST,
    payload
});

export default onRecvChatList;
