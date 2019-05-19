import React, {Component} from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import logo from './logo.svg';

import './App.css';
import {PrivateRoute} from "./helpers/PrivateRoute";
import {Profile} from "./Profile/Profile";
import {Login} from "./Login";

export default class App extends Component {

    constructor (props) {
        super();

        this.state = {
            history: createBrowserHistory()
        };

        //this.tokenRecieveHandler = this.tokenRecieveHandler.bind(this);
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={this.state.history}>
                            <div>
                                <PrivateRoute exact path="/" component={Profile} />
                                <Route path="/login" component={Login} />

                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        )
    }
}
