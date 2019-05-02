import React, {Component} from 'react';
import './Authorization.css';
import FormInput from '../../components/FormInput/FormInput';
import FormField from '../../components/FormField/FormField';
import pages from '../../constants/pages';
import api from '../../constants/api';
import {onAuthAction} from "../../middlewares/onAuth";

import {connect} from 'react-redux';
import {Redirect} from "react-router";
import Header from "../../components/Header/Header";

class Authorization extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSignUp: false,
        };

    }

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {login, password, name} = this.state;

        this.state.isSignUp
            ? this.props.auth({request: api.signUp, parameters: {login, password, name}})
            : this.props.auth({request: api.signIn, parameters: {login, password}});
    };

    changeAction = event => {
        event.preventDefault();

        this.setState({
            isSignUp: !this.state.isSignUp,
        });
    };

    render = () => {
        if (this.props.token) {
            return <Redirect to={pages.conversations}/>;
        }

        const errorMessage = this.props.error
            ? (<div className="row">
                <div className="col">
                    <div className="alert alert-danger" role="alert">{this.props.error}</div>
                </div>
            </div>)
            : null;

        const nameField = this.state.isSignUp
            ? (<FormField label='Name' name='name'>
                <FormInput name='name' onChange={this.handleInputChange}/>
            </FormField>)
            : null;

        return (
            <div className="container border p-5 vh-100">
                <Header/>
                <form onSubmit={this.handleSubmit}>
                    <FormField label='Login ' name='login'>
                        <FormInput name='login' onChange={this.handleInputChange}/>
                    </FormField>
                    <FormField label='Password' name='password'>
                        <FormInput name='password' type="password" onChange={this.handleInputChange}/>
                    </FormField>
                    {nameField}
                    {errorMessage}
                    <div class="btn-group">
                        <button className="btn btn-outline-primary" type='submit'>
                            {this.state.isSignUp
                                ? "Sign Up"
                                : "Sign In"}
                        </button>
                        <button className="btn btn-outline-info" onClick={this.changeAction}>
                            {this.state.isSignUp
                                ? "I have already had account"
                                : "Create new account"}
                        </button>
                    </div>
                </form>
            </div>
        );
    };
}

const mapStateToProps = state => {
    const {token, expires, error} = state.auth;
    return ({
        token,
        expires,
        error,
    });
};

const mapDispatchToProps = dispatch => ({
    auth: payload => dispatch(onAuthAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorization);
