import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { get_current_user } from '../api/service';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = get_current_user();
        if (!currentUser) {
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        return <Component {...props} {...rest} />
    }} />
);
