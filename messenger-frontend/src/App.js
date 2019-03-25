import React, {Component} from 'react';
import './App.css';
import * as axios from "axios";

class Heade extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {is_done: this.props.is_done};
        this.state = {login: '', password: '', name: ''};

        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const name = event.target.id;

        this.setState({
            [name]: event.target.value
        });
    }

    async handleSignUp(event) {
        // const formData = new FormData(event.target);
        console.log(this.state);

        event.preventDefault();
        await axios({
            method: 'post',
            url: 'http://messenger.westeurope.cloudapp.azure.com/api/authentication/signup/',
            data: {
                login: this.state.login,
                password: this.state.password,
                name: this.state.login
            },
            headers: {
                responseType: 'json'
            }
        })
            .then(function (response) {
                console.log(response);
                //Perform action based on response
                //this.setState({token:response.data.token, expires:response.data.expires})
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expires', response.data.expires);
            })
            .catch(function (error) {
                console.log(error);
                //Perform action based on error
            });

        // this.setState({name: '', descr: '', formFields: []});
        // await this.props.main.loadTasks();
        // this.props.main.forceUpdate();

    }

    async handleLogIn(event) {
        console.log(this.state);
        event.preventDefault();
        await axios({
            method: 'post',
            url: 'http://messenger.westeurope.cloudapp.azure.com/api/authentication/signin/',
            data: {
                login: this.state.login,
                password: this.state.password
            },
            headers: {
                responseType: 'json'
            }
        })
            .then(function (response) {
                console.log(response);
                //Perform action based on response
                //this.setState({token:response.data.token, expires:response.data.expires})
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expires', response.data.expires);
                //this.props.app.updateAfterLogin();
            })
            .catch(function (error) {
                console.log(error);
                //Perform action based on error
            });

        console.log(this.props.app);
        // this.setState({name: '', descr: '', formFields: []});
        // await this.props.main.loadTasks();
        // this.props.main.forceUpdate();

    }

    render() {
        return (
            <header>
                <div className="logo">My Wonderful Messenger</div>
                <nav className="main-menu">
                    <div className="side-menu-elem">
                        <form id="register_form" onSubmit={this.handleSignUp}>
                            <input type="text" id="login" value={this.state.login} onChange={this.handleChange}/>
                            <input type="password" id="password" value={this.state.password}
                                   onChange={this.handleChange}/>
                            <button onClick={this.handleLogIn} className="side-menu-elem" value="Log In">Log In</button>
                            <button onClick={this.handleSignUp} className="side-menu-elem" value="Sign Up">Sign Up
                            </button>
                        </form>
                    </div>
                </nav>
            </header>
        );
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {messages: null};


    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        axios({
            method: 'get',
            url: 'http://messenger.westeurope.cloudapp.azure.com/api/conversations/public/messages',
            data: {
                from: 0,
                count: 10
            },
            headers: {
                responseType: 'json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => {
                console.log(response);
                //Perform action based on response
                this.setState({'messages': response.data});
                console.log("MESSAGES");
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
                //Perform action based on error
            });
    }

    render() {
        console.log(this.state);
        return (
            <main>
                {this.state.messages ? (
                    <>
                        {this.state.messages.map((message, i) => (
                            <div className="message">
                                <div className="message-username">{message.user.slice(0,5)}</div>
                                <div className="message-text">{message.content}</div>
                            </div>
                        ))}
                    </>
                ) : (<p>No messages.</p>)}
                <div className="message">
                    <div className="message-username"> User</div>
                    <div className="message-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sapien
                        nisl, efficitur eget congue semper, condimentum ut dui. Ut massa ligula, vulputate sed maximus
                        ut, ultrices quis neque. Maecenas lectus ex, placerat non sapien a, bibendum ornare justo.
                        Aliquam eget quam accumsan, dignissim sapien at, posuere elit. Nulla in metus ullamcorper,
                        molestie erat sed, luctus mauris. Vivamus finibus ante elit, vitae consectetur nunc porttitor
                        ut. Maecenas at ligula est.
                    </div>
                </div>
                <div className="message">
                    <div className="message-username"> User</div>
                    <div className="message-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sapien
                        nisl, efficitur eget congue semper, condimentum ut dui. Ut massa ligula, vulputate sed maximus
                        ut, ultrices quis neque. Maecenas lectus ex, placerat non sapien a, bibendum ornare justo.
                        Aliquam eget quam accumsan, dignissim sapien at, posuere elit. Nulla in metus ullamcorper,
                        molestie erat sed, luctus mauris. Vivamus finibus ante elit, vitae consectetur nunc porttitor
                        ut. Maecenas at ligula est.
                    </div>
                </div>
                <div className="message">
                    <div className="message-username"> User</div>
                    <div className="message-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sapien
                        nisl, efficitur eget congue semper, condimentum ut dui. Ut massa ligula, vulputate sed maximus
                        ut, ultrices quis neque. Maecenas lectus ex, placerat non sapien a, bibendum ornare justo.
                        Aliquam eget quam accumsan, dignissim sapien at, posuere elit. Nulla in metus ullamcorper,
                        molestie erat sed, luctus mauris. Vivamus finibus ante elit, vitae consectetur nunc porttitor
                        ut. Maecenas at ligula est.
                    </div>
                </div>
                <div className="message">
                    <div className="message-username"> User</div>
                    <div className="message-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sapien
                        nisl, efficitur eget congue semper, condimentum ut dui. Ut massa ligula, vulputate sed maximus
                        ut, ultrices quis neque. Maecenas lectus ex, placerat non sapien a, bibendum ornare justo.
                        Aliquam eget quam accumsan, dignissim sapien at, posuere elit. Nulla in metus ullamcorper,
                        molestie erat sed, luctus mauris. Vivamus finibus ante elit, vitae consectetur nunc porttitor
                        ut. Maecenas at ligula est.
                    </div>
                </div>
                <div className="message">
                    <div className="message-username"> User</div>
                    <div className="message-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sapien
                        nisl, efficitur eget congue semper, condimentum ut dui. Ut massa ligula, vulputate sed maximus
                        ut, ultrices quis neque. Maecenas lectus ex, placerat non sapien a, bibendum ornare justo.
                        Aliquam eget quam accumsan, dignissim sapien at, posuere elit. Nulla in metus ullamcorper,
                        molestie erat sed, luctus mauris. Vivamus finibus ante elit, vitae consectetur nunc porttitor
                        ut. Maecenas at ligula est.
                    </div>
                </div>
                <div className="message">
                    <div className="message-username"> User</div>
                    <div className="message-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sapien
                        nisl, efficitur eget congue semper, condimentum ut dui. Ut massa ligula, vulputate sed maximus
                        ut, ultrices quis neque. Maecenas lectus ex, placerat non sapien a, bibendum ornare justo.
                        Aliquam eget quam accumsan, dignissim sapien at, posuere elit. Nulla in metus ullamcorper,
                        molestie erat sed, luctus mauris. Vivamus finibus ante elit, vitae consectetur nunc porttitor
                        ut. Maecenas at ligula est.
                    </div>
                </div>
                <div className="message">
                    <div className="message-username"> User</div>
                    <div className="message-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sapien
                        nisl, efficitur eget congue semper, condimentum ut dui. Ut massa ligula, vulputate sed maximus
                        ut, ultrices quis neque. Maecenas lectus ex, placerat non sapien a, bibendum ornare justo.
                        Aliquam eget quam accumsan, dignissim sapien at, posuere elit. Nulla in metus ullamcorper,
                        molestie erat sed, luctus mauris. Vivamus finibus ante elit, vitae consectetur nunc porttitor
                        ut. Maecenas at ligula est.
                    </div>
                </div>
            </main>
        );
    }
}

class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {conversations: null};
        //this.props.app.state.append("conversations", this)

        //this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        await axios({
            method: 'get',
            url: 'http://messenger.westeurope.cloudapp.azure.com/api/conversations',
            headers: {
                responseType: 'json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => {
                console.log("conversations");
                console.log(response);
                //Perform action based on response
                this.setState({conversations: response.data});
            })
            .catch(function (error) {
                console.log(error);
                //Perform action based on error
            });

        // this.setState({name: '', descr: '', formFields: []});
        // await this.props.main.loadTasks();
        // this.props.main.forceUpdate();

    }

    render() {
        return (
            <nav className="side-menu">
                menu
                {this.state.conversations ? (
                    <>
                        {this.state.conversations.map((conversation, i) => (
                            <a className="side-menu-elem" href="#">
                                {conversation.lastMessage.id}
                            </a>
                        ))}
                    </>
                ) : (<p>No conversations.</p>)}
                <a className="side-menu-elem" href="#">Chat</a>
                <a className="side-menu-elem" href="#">Chat</a>
            </nav>
        );

    }
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {conversations: null};
    }

    // componentDidMount() {
    //     fetch('https://jsonplaceholder.typicode.com/posts')
    //         .then(response => {
    //             return response.json();
    //         }).then(result => {
    //         this.setState({
    //             users: result
    //         });
    //     });
    // }

    updateAfterLogin() {
        this.state.conversations.loadData()
    }

    render() {
        return (
            <div>
                <Heade app={this}/>
                <div className="container">
                    <SideMenu app={this}/>
                    <Main app={this}/>
                    <aside>aside</aside>
                </div>
                <footer> footer</footer>
            </div>
        );
    }
}

export default App;
