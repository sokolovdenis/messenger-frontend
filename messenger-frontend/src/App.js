import React, {Component} from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from './helpers/history';
import logo from './logo.svg';

import './App.css';
import {PrivateRoute} from "./components/PrivateRoute";
import {Profile} from "./Profile/Profile";
import {Login} from "./Login";
import {Register} from "./Register";

export default class App extends Component {

    constructor (props) {
        super();

        this.state = {
            history: history,
        };

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
                                <Route path="/login"
                                       render={(routeProps) => (
                                           <Login handleToken={(token) => this.tokenHandler(token)} />
                                       )}
                                />
                                <Route path="/register"
                                       render={(routeProps) => (
                                           <Register handleToken={(token) => this.tokenHandler(token)} />
                                       )}
                                />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        )
    }
    tokenHandler(token) {
        localStorage.setItem("user-token", token);
        alert(token);
        history.push('/');
    }
}
