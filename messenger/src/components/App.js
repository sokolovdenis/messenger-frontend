import React, { Component } from 'react';
import { Router, Route} from 'react-router-dom';
import Auth from './Auth/Auth';
import Chat from './Chat/Chat';
import Header from './Header';
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
    }

    componentDidMount() {
		this.setState({ currentUser: authenticationService.getCurrentUser() });
		console.log(this.state.currentUser);
    }

    logout() {
		authenticationService.logout();
		this.setState({ currentUser: authenticationService.getCurrentUser() });
        history.push('/login');
    }

    render() {
        const { currentUser } = this.state;
        return (
            <Router history={history}>
                <div className='container'>
                    {currentUser &&
                        <Header logout={this.logout}/>
                    }
					<PrivateRoute exact path="/" component={Chat} />
					<Route path="/login" component={Auth} />
                </div>
            </Router>
        );
    }
}

export default App;