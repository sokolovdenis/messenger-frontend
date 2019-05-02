import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router';
import {HashRouter} from 'react-router-dom';
import Authorization from "../pages/Authorization";
import Conversations from '../pages/Conversations';
import pages from '../constants/pages';
import {AUTH_SUCCESS} from "../reducers/auth";
import store from "../store/store";

class App extends Component {
    constructor(props) {
        super(props);

        const token = localStorage.getItem("token");
        const expires = localStorage.getItem("expires");

        if (token && expires && Date.now() < Date.parse(expires)) {
            store.dispatch({
                type: AUTH_SUCCESS,
                payload: {
                    token,
                    expires,
                    error: null,
                },
            });
        }
    }

    render() {
        return (
            <div className="container">
                <HashRouter>
                    <Switch>
                        <Route path={pages.authentication} component={Authorization}/>
                        <Route path={pages.conversations} component={Conversations}/>
                        <Redirect from="/" to={pages.conversations}/>
                    </Switch>
                </HashRouter>
            </div>
        );
    }
}

export default App;
