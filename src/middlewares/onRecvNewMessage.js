import {UPDATE_CHAT_LIST} from "../reducers/recvChatList";
import {TRY_UPDATE_MESSAGE_LIST} from "../reducers/recvMessageList";

const RECV_NEW_MESSAGE = 'RECV_NEW_MESSAGE';

const onRecvNewMessage = store => next => action => {
    if (action.type !== RECV_NEW_MESSAGE) {
        return next(action);
    }

    const { ConversationId, Timestamp, User, Content, Id } = JSON.parse(action.payload);

    const message = {
        conversationId: ConversationId,
        timestamp: Timestamp,
        user: User,
        content: Content,
        id: Id,
    };

    store.dispatch({
        type: UPDATE_CHAT_LIST,
        payload: {
            newChat: { lastMessage: message,  id: ConversationId, },
            error: null,
        },
    });

    store.dispatch({
        type: TRY_UPDATE_MESSAGE_LIST,
        payload: {
            newMessage: message,
            error: null,
        },
    });
};

export const onRecvNewMessageAction = (payload) => ({
    type: RECV_NEW_MESSAGE,
    payload
});

export default onRecvNewMessage;
