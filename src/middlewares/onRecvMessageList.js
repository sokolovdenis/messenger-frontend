import {RECV_MESSAGE_LIST_SUCCESS, RECV_MESSAGE_LIST_FAILURE} from "../reducers/recvMessageList";
import {getErrorMessage} from '../utils/getErrorMessage';
import {apiRequest} from "../utils/apiRequest";

const RECV_MESSAGE_LIST = 'RECV_MESSAGE_LIST';

const onRecvMessageList = store => next => action => {
    if (action.type !== RECV_MESSAGE_LIST) {
        return next(action);
    }

    const {request, conversationId, token} = action.payload;

    apiRequest(request(conversationId), 'GET', token, null, messageList => {
        store.dispatch({
            type: RECV_MESSAGE_LIST_SUCCESS,
            payload: {
                messageList,
                conversationId,
                error: null,
            },
        });
    }, response => {
        store.dispatch({
            type: RECV_MESSAGE_LIST_FAILURE,
            payload: {
                messageList: [],
                conversationId,
                error: getErrorMessage(response),
            }
        })
    });
};

export const onRecvMessageListAction = (payload) => ({
    type: RECV_MESSAGE_LIST,
    payload
});

export default onRecvMessageList;
