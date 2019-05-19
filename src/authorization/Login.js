import React, { Component } from 'react'
import { get_current_user, sign_up, sign_in } from '../api/service'
import './Login.css';
import 'bootstrap/dist/css/bootstrap.css'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: "",
            login : "",
            password: "",
            requestingServer: false,
            warning: null,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleError       = this.handleError.bind(this);
        this.linkRegister      = this.linkRegister.bind(this);
        this.linkSignIn        = this.linkSignIn.bind(this);

        if (get_current_user()) {
            this.props.history.push('/');
        }
    }

    handleError(message) {
        this.setState({ requestingServer: false, warning: 'warning' });
    }

    linkRegister (event) {
        event.preventDefault();
        console.log("register");
        sign_up(
            this.state.login,
            this.state.password,
            this.state.user
        ).then(user => {
            const { from } = this.props.location.state || { from: { pathname: "/" } };
            this.props.history.push(from);
        }).catch(err => {
            this.handleError(err);
            console.log("Error logging in", err);
        });
    }

    linkSignIn (event) {
        event.preventDefault();
        console.log("login");
        sign_in(
            this.state.login,
            this.state.password
        ).then(user => {
            const { from } = this.props.location.state || { from: { pathname: "/" } };
            this.props.history.push(from);
        }).catch(err => {
            this.handleError(err);
            console.log("Error logging in", err);
        });
    }

    handleInputChange(event) {
        switch (event.target.id){
            case 'inputLogin1':
                this.setState({ login: event.target.value});
                break;
            case 'inputLogin2':
                this.setState({ login: event.target.value});
                break;
            case 'inputPassword1':
                this.setState({ password: event.target.value});
                break;
            case 'inputPassword2':
                this.setState({ password: event.target.value});
                break;
            case 'inputUser':
                this.setState({ user: event.target.value});
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div className="form-structor">
                <div className="signup">
                    <h2 className="form-title" id="signup"><span>or</span>Sign up</h2>
                    <div className="form-holder">
                        <input type="text" id="inputUser" className="input" placeholder="Name" value={this.state.user}
                               onChange={this.handleInputChange} required autoFocus />
                        <input type="email" id="inputLogin1" className="input" placeholder="Email" value={this.state.login}
                               onChange={this.handleInputChange} required autoFocus />
                        <input type="password" id="inputPassword1" className="input" placeholder="Password" value={this.state.password}
                               onChange={this.handleInputChange} required />
                    </div>
                    <button className="submit-btn" onClick={this.linkRegister} >Sign up</button>
                </div>
                <div className="login slide-up">
                    <div className="center">
                        <h2 className="form-title" id="login"><span>or</span>Log in</h2>
                        <div className="form-holder">
                            <input type="email" id="inputLogin2" className="input" placeholder="Email" value={this.state.login}
                                   onChange={this.handleInputChange} required autoFocus />
                            <input type="password" id="inputPassword2" className="input" placeholder="Password" value={this.state.password}
                                   onChange={this.handleInputChange} required />
                        </div>
                        <button className="submit-btn" onClick={this.linkSignIn} >Log in</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
