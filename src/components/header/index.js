import React from "react";
import {Link} from 'react-router-dom';
import './styles.css';

function Login(props) {
    return (
        <Link to="/login" className="Header-Link">Login</Link>
    );
}

function Logout(props) {
    return (
        <Link to="/logout" className="Header-Link">Logout</Link>
    );
}

function Signup(props) {
    return (
        <Link to="/signup" className="Header-Link">Signup</Link>
    );
}

function Controls(props) {
    const authorized = props.authorized;
    return (
        <nav className="Controls">
            {authorized || <Login/>}
            {authorized || <Signup/>}
            {authorized && <Logout/>}
        </nav>
    );
}

function Greeting(props) {
    const authorized = props.authorized;
    const myName = props.myName;
    return (
        <div className="Greeting">
            {authorized && !!myName ? `Hi, ${myName}` : ""}
        </div>
    );
}

class Header extends React.Component {
    render() {
        const authorized = this.props.authorized;
        const myName = this.props.myName;

        return (
            <div className="Header">
                <Greeting myName={myName} authorized={authorized} />
                <Controls authorized={authorized} />
            </div>
        );
    }
}

export default Header;
