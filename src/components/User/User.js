import React, {Component} from 'react';
import {connect} from "react-redux";

import './User.css';
import api from "../../constants/api";
import {onGetUserByIdAction} from "../../middlewares/onGetUserById";

class User extends Component {
    componentDidMount() {
        if (!this.props.name && !this.props.idToName[this.props.id]) {
            if (!this.props.idToNameStarted.includes(this.props.id)) {
                this.props.getUserById({
                    request: api.getUserById,
                    id: this.props.id,
                    token: this.props.token,
                });
            }
        }
    }

    render() {
        const name = this.props.name
            ? this.props.name
            : this.props.idToName[this.props.id]
                ? this.props.idToName[this.props.id]
                : this.props.id;

        return (
            <div className="User">
                {name}
            </div>
        )
    }
}

User.defaultProps = {
    idToName: {},
    idToNameStarted: [],
};

const mapStateToProps = state => ({
    token: state.auth.token,
    idToName: state.getUserById.idToName,
    idToNameStarted: state.getUserById.idToNameStarted,
});

const mapDispatchToProps = dispatch => ({
    getUserById: payload => dispatch(onGetUserByIdAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
