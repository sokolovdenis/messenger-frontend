import {RECV_NEW_MESSAGE_SUCCESS, RECV_NEW_MESSAGE_FAILURE} from "../reducers/recvNewMessage";

const RECV_NEW_MESSAGE = 'RECV_NEW_MESSAGE';

const onRecvNewMessage = store => next => action => {
    if (action.type !== RECV_NEW_MESSAGE) {
        return next(action);
    }

    console.log(action);
};

export const onRecvNewMessageAction = (payload) => ({
    type: RECV_NEW_MESSAGE,
    payload
});

export default onRecvNewMessage;
