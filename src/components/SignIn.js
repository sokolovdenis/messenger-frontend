import React, { Component } from 'react';
import ReactDOM from 'react-dom';


import { signIn } from './../Api.js';
import SignUp from './SignUp.js';
import Messenger from "./Messenger";

import {Aside, Body, Container, Content, Footer, Header} from "react-holy-grail-layout";


// export default () => (
//     <Container>
//         <Header bg="lightgreen" p={2}>
//             Header
//         </Header>
//         <Body>
//         <Content bg="lightblue" p={2}>
//             Content
//         </Content>
//         <Aside bg="pink" left primary p={2}>
//             Left
//         </Aside>
//         <Aside bg="orange" right p={2}>
//             Right
//         </Aside>
//         </Body>
//         <Footer bg="yellow" p={2}>
//             Footer
//         </Footer>
//     </Container>
// )

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login : '',
            password : ''
        };

        // bind для всех функций
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.signUp = this.signUp.bind(this);
    }

    handleLoginChange(event) {
        this.setState({'login': event.target.value})
    }

    handlePasswordChange(event) {
        this.setState({'password': event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();


        signIn(this.state.login, this.state.password)
            .then( response =>
                response.json().then(user => ({user, response}))
            ).then(({user, response}) => {
                if (response.ok) {
                    localStorage.setItem('token', user.token);
                    localStorage.setItem('expires', user.expires);
                    // this.props.history.push("/");
                    ReactDOM.render(
                        <Messenger />,
                        document.getElementById('root')
                    );
                }
            }).catch(e => console.log("Error: ", e));
    }

    signUp() {
        ReactDOM.render(
            <SignUp />,
            document.getElementById('root')
        );
    }

    render() {
        return (
            <Container>
                <Header bg="lightgreen" p={2}>
                    <b onClick={this.signUp}> Create account </b>
                </Header>
                {/*<form onSubmit={this.handleSubmit} class="regForm">*/}
                <Body>
                    <Content>
                        <form onSubmit={this.handleSubmit} className="regForm">
                            <article> Welcome back! </article>
                            <p>
                            <label>Login: </label>
                            <input type="text" onChange={this.handleLoginChange} placeholder="Login" required autoFocus />
                            </p>
                            <p>
                            <label>Password: </label>
                            <input type="text" onChange={this.handlePasswordChange} placeholder="Password" required />
                            </p>
                            <button type="submit">Sign In</button>
                        </form>
                    </Content>
                </Body>
                {/*<Footer bg="blue" p={2}>*/}

                {/*</Footer>*/}
            </Container>
        );
    }
}

export default SignIn;
