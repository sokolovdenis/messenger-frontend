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
        const query = event.target.value;

        if (query !== '') {
            this.props.recvUserList({
                request: api.getUserByName,
                query,
                token: this.props.token,
            });
        }
    }

    render () {
        console.log(this.props.userList);
        return (
            <div className="SearchPanel">
                <FormField class="SearchPanel__Query" label="Поиск" name="search">
                    <FormInput name="search" onChange={this.handleInputChange.bind(this)}/>
                </FormField>
                <ul>
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
});

const mapDispatchToProps = dispatch => ({
    recvUserList: debounce((payload) => dispatch(onRecvUserListAction(payload)), DEBOUNCE_TIMEOUT),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
