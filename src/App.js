// eslint-disable-next-line
import React, {Component} from 'react';
import Login from "./elements/Login";
import './App.css';
import Register from "./elements/Register";
import Main from "./elements/Main";
const api = 'http://messenger.westeurope.cloudapp.azure.com';


export default class App extends Component{

    constructor(props) {
        super(props);
        localStorage.setItem('api', api);
        localStorage.setItem('main_page', 'main');
        localStorage.setItem('log_page', 'log');
        localStorage.setItem('reg_page', 'reg');
        this.state = {
            currentPage: 'log'
        };
    }
    updateLogin(newPage){
        console.log(newPage);
        console.log(localStorage.getItem('token'));
        this.setState({ currentPage:newPage });
    }

    loginPage() {
        return (<div className="App">
            <header className="App-header">
                Login into messenger
            </header>
            <div>
            <Login callback={this.updateLogin.bind(this)} />
            </div>
        </div>);
    }

    registerPage() {
        return (<div className="App">
            <header className="App-header">
                Register new user
            </header>
            <div>
                <Register callback={this.updateLogin.bind(this)} />
            </div>
        </div>);
    }
//<Login callback={this.updateLogin.bind(this)} />
    render() {
        if (this.state.currentPage === 'log') {
            return this.loginPage();
        } else if (this.state.currentPage === 'reg'){
            return this.registerPage();
        } else {
            return (<div className="App">
                <Main />
            </div>);
    }
    }
}