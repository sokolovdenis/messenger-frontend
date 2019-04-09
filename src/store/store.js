import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';

import onAuth from '../middlewares/onAuth';

const store = createStore(
    reducer,
    applyMiddleware(onAuth)
);

export default store;
