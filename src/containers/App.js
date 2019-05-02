import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router';
import {HashRouter} from 'react-router-dom';

import './App.css';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Authorization from "../pages/Authorization/Authorization";
import Conversations from '../pages/Conversations/Conversations';
import pages from '../constants/pages';

import store from "../store/store";
import {AUTH_SUCCESS} from "../reducers/auth";

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
