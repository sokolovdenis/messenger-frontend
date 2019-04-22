import React, { Component } from 'react';
import { Router, Route} from 'react-router-dom';
import Auth from './Auth/Auth';
import Chat from './Chat/Chat';
import { history } from './_components/history';
import {authenticationService} from '../services/Api/Api'
import { PrivateRoute } from './_components/PrivateRoute';
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
        this.logout = this.logout.bind(this);
    }

    componentWillMount() {
		this.setState({ currentUser: authenticationService.getCurrentUser()});
    }

    logout(event) {
		authenticationService.logout();
		this.setState({ currentUser: authenticationService.getCurrentUser()});
        history.push('/login');
    }

    render() {
        return (
            <Router history={history}>
                <div className='container'>
					<PrivateRoute exact path="/" component={Chat} logout={this.logout} />
					<Route path="/login" component={Auth} />
                </div>
            </Router>
        );
    }
}

export default App;