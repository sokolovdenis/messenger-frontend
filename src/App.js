// eslint-disable-next-line
import React, {Component} from 'react';
import Login from "./containers/Login";
import './App.css';


export default class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            login: ""
        };
    }
    updateLogin(login){
        this.state.login = login;
    }

    render() {
        return <Login updateLogin={this.updateLogin.bind(this)} />
    }
}