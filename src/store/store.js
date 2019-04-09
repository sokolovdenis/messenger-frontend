import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';

import auth from '../middlewares/auth';

const store = createStore(
    reducer,
    applyMiddleware(auth)
);

export default store;
