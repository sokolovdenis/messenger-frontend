import React, { Component } from 'react';
import LOGIN_URL from '../helpers/consts';
import {HidingAlert} from "../components/HidingAlert";
import { Link } from 'react-router-dom';

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { dispatch } = this.props;
        if (!this.state.username || !this.state.password) {
            alert("All fields are required");
            return;
        }

        let body = {
            "login": this.state.username,
            "password": this.state.password
        };

        let login_url = "http://messenger.westeurope.cloudapp.azure.com/api/authentication/signin";
        let promise = fetch(
            login_url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });


        promise.then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                let error = new Error(resp.statusText);
                error.response = resp;
                throw error
            }
        }).then((json) => {return json.token})
            .then((token) => this.props.handleToken(token))
            .catch(err => {
                Promise.resolve(err.response.text()).then(value => {this.setState({error: value});alert(value);});
            })

    }


    render() {
        return (
            <div className="row">
                <div className="col-md-6 mx-auto my-auto">
                    <div className="card">
                        <article className="card-body">
                            <Link to="/register" className="float-right btn btn-outline-primary">Register</Link>
                            <h4 className="card-title mb-4 mt-1">Sign in</h4>
                            <form name="form" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>Your username</label>
                                    <input type="text" class="form-control" placeholder="Username" name="username" value={this.state.username} onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Your password</label>
                                    <input type="text" className="form-control" placeholder="********" name="password" value={this.state.password} onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block"> Login</button>
                                </div>
                                <HidingAlert msg={this.state.error} />
                            </form>
                        </article>
                    </div>
                </div>
            </div>
        )
    }

}
