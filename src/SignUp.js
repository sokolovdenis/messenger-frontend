import React, {Component} from 'react';
import { Button } from 'reactstrap';

import './SignUp.css'


class SignUp extends Component {
    state = {
        login: '',
        password: '',
        name: ''
    }

    onNameChange = e => {
        this.setState({
            name: e.target.value
        });
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
        const { login, password, name } = this.state;
        const { error } = this.props;
        const inputClassName = error ? 'inputSignUp_error' : 'inputSignUp';
        return (
            <div className="SignUp">
                <p>First time?</p>
                <input className={inputClassName} placeholder="Enter name" onChange={this.onNameChange}/>
                <input className={inputClassName} placeholder="Enter login" onChange={this.onLoginChange}/>
                <input className={inputClassName} placeholder="Enter password" type="password" onChange={this.onPasswordChange}/>
                <Button color="warning" onClick={() => this.props.onRegister(login, password, name)}>Register me</Button>
            </div>
        );
    }
}

export default SignUp;