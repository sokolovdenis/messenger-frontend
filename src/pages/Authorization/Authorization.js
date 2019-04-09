import React, {Component} from 'react';
import './Authorization.css';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import FormInput from '../../components/FormInput/FormInput';
import FormField from '../../components/FormField/FormField';
import pages from '../../constants/pages';
import api from '../../constants/api';

import {connect} from 'react-redux';
import {onAuthAction} from "../../middlewares/onAuth";
import {Redirect} from "react-router";

class Authorization extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: '',
            name: '',
            isSignUp: true,
        };
    }

    formClear() {
        this.setState({
            login: '',
            password: '',
            name: ''
        });
    };

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {login, password, name} = this.state;

        this.state.isSignUp
            ? this.props.auth({ request: api.signUp, parameters: { login, password, name}})
            : this.props.auth({ request: api.signIn, parameters: { login, password }});

        this.formClear();
    };

    changeAction = event => {
        event.preventDefault();

        this.setState({
            isSignUp: !this.state.isSignUp,
            name: '',
        });
    };

    render() {
        if (this.props.token) {
            return <Redirect to={pages.conversations}/>;
        }

        const errorMessage = this.props.error
            ? <div className="errorMessage">{this.props.error}</div>
            : null;

        return (
            <div className="Authorization">
                {errorMessage}
                <Form onSubmit={this.handleSubmit}>
                    <FormField label='Логин ' name='login'>
                        <FormInput value={this.state.login} name='login' onChange={this.handleInputChange}/>
                    </FormField>
                    <FormField label='Пароль' name='password'>
                        <FormInput value={this.state.password} name='password' onChange={this.handleInputChange}/>
                    </FormField>
                    <span className="haveAccount" onClick={this.changeAction}>{
                        this.state.isSignUp
                            ? "У меня уже есть аккаунт"
                            : "Создать новый аккаунт"
                    }</span>
                    {this.state.isSignUp
                        ? (<FormField label='Имя пользователя' name='name'>
                            <FormInput value={this.state.name} name='name' onChange={this.handleInputChange}/>
                        </FormField>)
                        : null}
                    <br/>
                    <Button type='submit'>{this.state.isSignUp ? "Зарегистрироваться" : "Войти"}</Button>
                </Form>
            </div>
        );
    }
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
    auth: (userData) => dispatch(onAuthAction(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorization);
