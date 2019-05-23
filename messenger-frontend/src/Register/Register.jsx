import React, { Component } from 'react';
import LOGIN_URL from '../helpers/consts';
import {HidingAlert} from "../components/HidingAlert";
import { Link } from 'react-router-dom';
import {history} from "../helpers/history";

export class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
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
            "name": this.state.name,
            "login": this.state.username,
            "password": this.state.password
        };

        let login_url = "http://messenger.westeurope.cloudapp.azure.com/api/authentication/signup";
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
            .then((token) => this.setToken(token))
            .catch(err => {
                Promise.resolve(err.response.text()).then(value => {this.setState({error: value});alert(value);});
            })
    }


    render() {
        return (
            <main>
                <div className="row">
                    <div className="col-md-6 mx-auto my-auto">
                        <div className="card">
                            <article className="card-body">
                                <Link to="/login" className="float-right btn btn-outline-success">Log in</Link>
                                <h4 className="card-title mb-4 mt-1">Register</h4>
                                <form name="form" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label>Your name</label>
                                        <input type="text" className="form-control" placeholder="John Smith" name="name"
                                               value={this.state.name} onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Your username</label>
                                        <input type="text" className="form-control" placeholder="username" name="username" value={this.state.username} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Your password</label>
                                        <input type="password" className="form-control" placeholder="********" name="password" value={this.state.password} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-success btn-block"> Register</button>
                                    </div>
                                    <HidingAlert msg={this.state.error} />
                                </form>
                            </article>
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    setToken(token) {
        this.props.handleToken(token);
    }
}
