import React, {Component} from 'react';
import {connect} from "react-redux";

class Header extends Component {
    render() {
        return (
            <header className="row">
                <div className="col">
                    <h1 className="Header__title">Messenger</h1>
                </div>
            </header>
        );
    }
}

const mapStateToProps = state => ({token: state.auth.token});

export default connect(mapStateToProps)(Header);
