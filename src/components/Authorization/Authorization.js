import React, {Component} from 'react';
import './Authorization.css';
import Form from '../Form/Form'
import Button from '../Button/Button'
import FormField from '../FormField/FormField'
import FormInput from '../FormInput/FormInput'

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

export default Authorization;
