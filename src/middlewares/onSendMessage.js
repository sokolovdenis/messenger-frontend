import {SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAILURE} from "../reducers/sendMessage";
import {getErrorMessage} from '../utils/getErrorMessage'
import {addPathAndQueries} from "../utils/addPathAndQueries";
import {apiRequest} from "../utils/apiRequest";

const SEND_MESSAGE = 'SEND_MESSAGE';

const onSendMessage = store => next => action => {
    if (action.type !== SEND_MESSAGE) {
        return next(action);
    }

    const {request, conversationId, path, token, content} = action.payload;

    if (content === '') {
        store.dispatch({
            type: SEND_MESSAGE_FAILURE,
            payload: {
                error: "Введите текст сообщения",
            }
        });

        return;
    }

    apiRequest(addPathAndQueries(request(conversationId), path, []),
        'POST', token, { content }, userList => {
            store.dispatch({
                type: SEND_MESSAGE_SUCCESS,
                payload: {
                    error: null,
                },
            });
        }, response => {
            store.dispatch({
                type: SEND_MESSAGE_FAILURE,
                payload: {
                    error: getErrorMessage(response),
                }
            })
        });
};

export const onSendMessageAction = (payload) => ({
    type: SEND_MESSAGE,
    payload
});

export default onSendMessage;
