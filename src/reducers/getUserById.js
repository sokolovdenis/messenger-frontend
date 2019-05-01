import {createAction, createReducer} from 'redux-act';

export const GET_USER_BY_ID_SUCCESS = 'GET_USER_BY_ID_SUCCESS';
const getUserByIdSuccessAction = createAction(GET_USER_BY_ID_SUCCESS);

export const GET_USER_BY_ID_STARTED = 'GET_USER_BY_ID_STARTED';
const getUserByIdStartedAction = createAction(GET_USER_BY_ID_STARTED);

const getUserById = createReducer({
    [getUserByIdSuccessAction]: (state, payload) => ({
        ...state,
        ...payload,
        idToName: {...state.idToName, [payload.id]: payload.name}
    }),
    [getUserByIdStartedAction]: (state, payload) => ({
        ...state,
        ...payload,
        idToNameStarted: [...state.idToNameStarted, payload.id]
    }),
}, {idToName: {"public": "Общая беседа"}, idToNameStarted: []});

export default getUserById;
