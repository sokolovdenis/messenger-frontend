import {DO_CHANGE_CONVERSATION_ID} from "../reducers/recvMessageList";

const CHANGE_CONVERSATION_ID = 'CHANGE_CONVERSATION_ID';

const onChangeConversationId = store => next => action => {
    if (action.type !== CHANGE_CONVERSATION_ID) {
        return next(action);
    }

    store.dispatch({
        type: DO_CHANGE_CONVERSATION_ID,
        payload: action.payload,
    });
};

export const onChangeConversationIdAction = conversationId => ({
    type: CHANGE_CONVERSATION_ID,
    payload: {conversationId,}
});

export default onChangeConversationId;
