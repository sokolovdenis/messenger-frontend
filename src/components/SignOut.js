import React, { Component } from 'react';
import ReactDOM from 'react-dom';


import SignIn from './SignIn.js';
import {getSelfUser} from "../Api";

import {
    Container,
    Header,
    Body,
    Content,
    Aside,
    Footer
} from 'react-holy-grail-layout'


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
                    localStorage.setItem('userId', user.id);
                }
            })
            .catch(e => console.log(e));
    }

    signOut() {
        localStorage.setItem('token', '');
        localStorage.setItem('userId', '');
        ReactDOM.render(
            <SignIn />,
            document.getElementById('root')
        );
    }

    render() {
        return (
            <bodySO background="#90ee90">
                <b onClick={this.signOut}>Sign Out</b>
                <br/>
                <article> You logIn as: {this.state.name}  </article>
            </bodySO>
        );
    }
}

export default SignOut;


