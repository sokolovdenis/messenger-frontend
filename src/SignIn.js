import React, {Component} from 'react';
import { Button } from 'reactstrap';

import "./SignIn.css"


class SignIn extends Component {
    state = {
        login: '',
        password: ''
    }

    onLoginChange = e => {
        this.setState({
            login: e.target.value
        });
    }

    onPasswordChange = e => {
        this.setState({
            password: e.target.value
        });
    }
    render() {
        const { login, password } = this.state;
        const { error } = this.props;
        const inputClassName = error ? 'inputSignIn_error' : 'inputSignIn';
        return (
            <div className="SignIn">
            <input className={inputClassName} placeholder="Enter login" onChange={this.onLoginChange}/>
            <input className={inputClassName} placeholder="Enter password " type="password" onChange={this.onPasswordChange}/>
            <Button color="warning" onClick={() => this.props.onLogin(login, password)}>Login</Button>
            </div>
        );
    }
}

export default SignIn;