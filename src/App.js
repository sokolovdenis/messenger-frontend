import React from 'react';
import {Route, Switch, withRouter} from 'react-router';
import Registration from "./components/registration";
import Login from "./components/login";
import {getAuthToken, removeAuthToken, setAuthToken} from './jwt';
import Header from './components/header';
import Messenger from './components/messenger';
import './App.css';
import {getMyProfile} from './serverApi';


function Logout(props) {
    removeAuthToken();
    props.history.push("/");
    return null;
}


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            myName: undefined,
            myId: undefined
        };
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
        if( !!getAuthToken() ) {
            getMyProfile(getAuthToken()).then(data => {
                this.setState({myName: data.name, myId: data.id});
            })
        }
    }

    handleLogin(authToken) {
        setAuthToken(authToken);
        getMyProfile(authToken).then(data => {
            this.setState({myName: data.name, myId: data.id});
            this.props.history.push("/");
        });
    }

    render() {
        const authorized = !!getAuthToken();
        return (
            <div className="App">
                <header className="App-header">
                    <Header authorized={authorized} myName={this.state.myName}/>
                </header>

                <div className="App-body">
                    <Switch>
                        <Route exact path="/">
                            {authorized
                                ? <Messenger myName={this.state.myName} myId={this.state.myId}/>
                                : <Login onSuccess={this.handleLogin}/>}
                        </Route>

                        <Route path="/login">
                            <Login onSuccess={this.handleLogin}/>
                        </Route>

                        <Route path="/signup">
                            <Registration onSuccess={this.handleLogin}/>
                        </Route>

                        <Route path="/logout" component={Logout}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withRouter(App);
