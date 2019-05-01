import {createAction, createReducer} from 'redux-act';
import {parseConversationId} from '../utils/parseConversationId';

export const RECV_MESSAGE_LIST_SUCCESS = 'RECV_MESSAGE_LIST_SUCCESS';
const recvMessageListSuccessAction = createAction(RECV_MESSAGE_LIST_SUCCESS);

export const RECV_MESSAGE_LIST_FAILURE = 'RECV_MESSAGE_LIST_FAILURE';
const recvMessageListFailureAction = createAction(RECV_MESSAGE_LIST_FAILURE);

export const TRY_UPDATE_MESSAGE_LIST = 'TRY_UPDATE_MESSAGE_LIST';
const tryUpdateMessageListAction = createAction(TRY_UPDATE_MESSAGE_LIST);

export const DO_CHANGE_CONVERSATION_ID = 'DO_CHANGE_CONVERSATION_ID';
const doChangeConversationIdAction = createAction(DO_CHANGE_CONVERSATION_ID);

const updateMessageList = (state, newMessage) => {
    const conversationId = parseConversationId(newMessage.conversationId);

    if (state.conversationId !== conversationId) {
        return state.messageList;
    }

    return [...state.messageList, {...newMessage, conversationId}];
};

const recvMessageList = createReducer({
    [recvMessageListSuccessAction]: (state, payload) => ({...state, ...payload}),
    [recvMessageListFailureAction]: (state, payload) => ({...state, ...payload}),
    [tryUpdateMessageListAction]: (state, payload) => ({
        ...state,
        ...payload,
        messageList: updateMessageList(state, payload.newMessage),
    }),
    [doChangeConversationIdAction]: (state, payload) => ({
        ...state,
        ...payload,
        messageList: [],
    })
}, {messageList: [], conversationId: "public"});

export default recvMessageList;
