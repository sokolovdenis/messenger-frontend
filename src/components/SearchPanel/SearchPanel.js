import React, {Component} from 'react';
import './SearchPanel.css';
import FormInput from "../FormInput/FormInput";
import FormField from "../FormField/FormField";
import {onRecvUserListAction} from "../../middlewares/onRecvUserList";
import {connect} from "react-redux";
import {debounce} from "../../utils/debounce";
import {DEBOUNCE_TIMEOUT} from "../../constants/debounceTimeout";
import api from "../../constants/api";
import User from "../User/User";
import PropTypes from "prop-types";

class SearchPanel extends Component {
    handleInputChange(event) {
        this.props.recvUserList({
            request: api.getUserByName,
            query: event.target.value,
            token: this.props.token,
        });
    }

    render () {

        const emptyResult = this.props.message
            ? <div className="SearchPanel__empty">{this.props.message}</div>
            : null;

        return (
            <div className="SearchPanel">
                <FormField class="SearchPanel__query" label="Поиск" name="search">
                    <FormInput name="search" onChange={this.handleInputChange.bind(this)}/>
                </FormField>
                {emptyResult}
                <ul className="SearchPanel__results">
                    {this.props.userList.map((user, index) => (
                        <li key={index}>
                            <User {...user}/>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

SearchPanel.propTypes = {
    userList: PropTypes.array
};

SearchPanel.defaultProps = {
    userList: []
};

const mapStateToProps = state => ({
    token: state.auth.token,
    userList: state.recvUserList.userList,
    message: state.recvUserList.message,
});

const mapDispatchToProps = dispatch => ({
    recvUserList: debounce((payload) => dispatch(onRecvUserListAction(payload)), DEBOUNCE_TIMEOUT),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
