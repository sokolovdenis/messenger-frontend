import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';

import signIn from '../middleware/signIn';
import signUp from '../middleware/signUp';

const store = createStore(
    reducer,
    applyMiddleware(signIn, signUp)
);

export default store;
