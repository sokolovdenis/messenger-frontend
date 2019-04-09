import React, {Component} from 'react';
import './SignOut.css';
import Button from "../Button/Button";

import {connect} from "react-redux";
import {onSignOutAction} from "../../middlewares/onSignOut";

class SignOut extends Component {
    handleClick = event => {
        event.preventDefault();
        this.props.signOut();
    };

    render() {
        return (
            <div className="SignOut">
                <Button class="SignOut__button" type="button" onClick={this.handleClick}>
                    Выйти
                </Button>
            </div>
        );
    };
}

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(onSignOutAction()),
});

export default connect(null, mapDispatchToProps)(SignOut);
