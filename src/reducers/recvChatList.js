import {createAction, createReducer} from 'redux-act';

export const RECV_CHAT_LIST_SUCCESS = 'RECV_CHAT_LIST_SUCCESS';
const recvChatListSuccessAction = createAction(RECV_CHAT_LIST_SUCCESS);

export const RECV_CHAT_LIST_FAILURE = 'RECV_CHAT_LIST_FAILURE';
const recvChatListFailureAction = createAction(RECV_CHAT_LIST_FAILURE);

export const UPDATE_CHAT_LIST = 'UPDATE_CHAT_LIST';
const updateChatListAction = createAction(UPDATE_CHAT_LIST);

const updateChatList = (chatList, newChat) => {
    let chatPos = null;
    for (let i = 0; i < chatList.length; ++i) {
        if (chatList[i].id === newChat.id) {
            chatPos = i;
            break;
        }
    }

    if (chatPos !== null) {
        chatList.splice(chatPos, 1);
    }

    return [newChat, ...chatList];
};

const recvChatList = createReducer({
    [recvChatListSuccessAction]: (state, payload) => ({ ...state, ...payload}),
    [recvChatListFailureAction]: (state, payload) => ({ ...state, ...payload}),
    [updateChatListAction]: (state, payload) => ({
        ...state,
        ...payload,
        chatList: updateChatList(state.chatList, payload.newChat),
    })
}, { chatList: [] });

export default recvChatList;
