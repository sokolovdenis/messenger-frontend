import React from 'react';
import AuthService from './AuthService';

export default class Chat extends AuthService {
    constructor(props) {
        super(props)
        this.state = {

        };
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount() {
        console.log(super.IsLoggedIn());
        if(!super.IsLoggedIn()) {
            this.props.history.replace("/");
        }
    }

    onSubmit = (event) => {
        super.Logout();
    }

    render() {
        return (
            <div>
                <h1>Чат!</h1> 
                <form onSubmit={this.onSubmit}>
                    <input className="form-submit" type="submit" value="Войти"/>
                </form>
            </div>
        );
    }
}
