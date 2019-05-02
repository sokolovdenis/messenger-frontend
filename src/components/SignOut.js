import React, {Component} from 'react';
import {connect} from "react-redux";
import {onSignOutAction} from "../middlewares/onSignOut";

class SignOut extends Component {
    handleClick = event => {
        event.preventDefault();
        this.props.signOut();
    };

    render() {
        return (
            <button className="btn btn-outline-primary" onClick={this.handleClick}>
                Sign Out
            </button>
        );
    };
}

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(onSignOutAction()),
});

export default connect(null, mapDispatchToProps)(SignOut);
