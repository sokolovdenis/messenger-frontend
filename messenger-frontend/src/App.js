import React, {Component} from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from './helpers/history';

import './App.css';
import {PrivateRoute} from "./components/PrivateRoute";
import {Messenger} from "./Messenger";
import {Login} from "./Login";
import {Register} from "./Register";

export default class App extends Component {

    constructor (props) {
        super();

        this.state = {
            history: history,
        };
    }
    componentDidMount() {
        const token = localStorage.getItem("user-token");
        if (token) {
            this.tokenHandler(token);
        }
    }

    tokenHandler(token) {
        this.setState({token: token});
        localStorage.setItem("user-token", token);
        let hs = this.state.history;
        hs.push("/");
        this.setState({history: hs});
    }


    render() {
        return (
            <div className="App">
                <Router history={this.state.history}>
                    <div>
                        <PrivateRoute exact path="/" component={Messenger} token={this.state.token}/>
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
        )
    }
}
