import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SignIn from './SignIn.js';
import {getSelfUser} from "../Api";


class SignOut extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name : ''
        };

        this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {
        getSelfUser()
            .then(response =>
                response.json().then(user => ({user, response}))
            )
            .then(({user, response}) => {
                if (response.ok) {
                    this.setState({'name' : user.name});
                } else if (response.status === 401) {
                    console.log('Need authenticate');
                }
            })
            .catch(e => console.log(e));
    }

    signOut() {
        localStorage.setItem('token', '');
        ReactDOM.render(
            <SignIn />,
            document.getElementById('root')
        );
    }

    render() {
        return (
            <header>
                <b onClick={this.signOut}>Sign Out</b>
                <br/>
                <article>{this.state.name}</article>
            </header>
        );
    }
}

export default SignOut;