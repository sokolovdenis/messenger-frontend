import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Login from "./authorization/Login";
import Chat from './chat/components/Chat';
import { PrivateRoute } from './api/privateRoute';
import './App.css';
import { get_current_user, logout } from "./api/service";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: get_current_user(),
            history: createBrowserHistory()
        };
        this.logout = this.logout.bind(this);
        this.state.history.push('/login');
    }

    logout(event) {
        logout();
        this.setState({ currentUser: get_current_user()});
        this.state.history.push('/login');
    }

    render() {
        return (
            <Router history={this.state.history}>
                <div className="App">
                    <PrivateRoute exact path="/" component={Chat} logout={this.logout} />
                    <Route path="/login" exact component={Login}/>
                </div>
            </Router>
        );
    }
}

export default App;
