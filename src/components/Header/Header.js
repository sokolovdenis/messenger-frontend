import React, {Component} from 'react';
import './Header.css';
import SignOut from "../SignOut/SignOut";
import {connect} from "react-redux";

class Header extends Component {
    render() {
        return (
            <header className="Header">
                <h1 className="Header__title">Messenger</h1>
                {this.props.token
                    ? <SignOut/>
                    : null}
            </header>
        );
    }
}

const mapStateToProps = state => ({token: state.auth.token});

export default connect(mapStateToProps)(Header);
