import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from '../reducers';
import onAuth from '../middlewares/onAuth';
import onSignOut from "../middlewares/onSignOut";

const store = createStore(
    reducer,
    applyMiddleware(onAuth, onSignOut, thunk)
);

export default store;
