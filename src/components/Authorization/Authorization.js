import React, {Component} from 'react';
import './Authorization.css';
import Button from '../Button/Button'
import Form from '../Form/Form'
import FormInput from '../FormInput/FormInput'
import FormField from '../FormField/FormField'

import {connect} from 'react-redux'
import {signUpAction} from "../../middleware/signUp";
import {signInAction} from "../../middleware/signIn";

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
            ? this.props.signUp({login, password, name})
            : this.props.signIn({login, password});

        this.formClear();
    };

    changeAction = event => {
        event.preventDefault();

        this.setState({
            isSignUp: !this.state.isSignUp,
            name: '',
        })
    };

    render() {
        return (
            <div className="Authorization">
                <Form onSubmit={this.handleSubmit}>
                    <FormField label='Логин ' name='login'>
                        <FormInput value={this.state.login} name='login' onChange={this.handleInputChange}/>
                    </FormField>

                    <FormField label='Пароль' name='password'>
                        <FormInput value={this.state.password} name='password' onChange={this.handleInputChange}/>
                    </FormField>

                    <span onClick={this.changeAction}>{
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

const mapDispatchToProps = dispatch => ({
    signIn: (userData) => dispatch(signInAction(userData)),
    signUp: (userData) => dispatch(signUpAction(userData))
});

export default connect(null, mapDispatchToProps)(Authorization);
