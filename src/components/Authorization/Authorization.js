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
            name: ''
        };
    }

    formClear() {
        this.setState({
            login: '',
            password: '',
            name: ''
        });
    };

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.signUp(this.state);
        this.formClear();
    };

    render() {
        return (
            <div className="Authorization">
                <Form onSubmit={this.handleSubmit}>
                    <FormField label='Login ' name='login'>
                        <FormInput value={this.state.login} name='login' onChange={this.handleInputChange}/>
                    </FormField>

                    <FormField label='Password' name='password'>
                        <FormInput value={this.state.password} name='password' onChange={this.handleInputChange}/>
                    </FormField>

                    <FormField label='Name' name='name'>
                        <FormInput value={this.state.name} name='name' onChange={this.handleInputChange}/>
                    </FormField>
                    <Button type='submit'>Отправить</Button>
                </Form>
            </div>
        );
    }
};

const mapDispatchToProps = dispatch => ({
    signIn: (userData) => dispatch(signInAction(userData)),
    signUp: (userData) => dispatch(signUpAction(userData))
});

export default connect(null, mapDispatchToProps)(Authorization);
