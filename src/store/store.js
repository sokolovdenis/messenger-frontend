import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from '../reducers';
import onAuth from '../middlewares/onAuth';

const store = createStore(
    reducer,
    applyMiddleware(thunk, onAuth)
);

export default store;
