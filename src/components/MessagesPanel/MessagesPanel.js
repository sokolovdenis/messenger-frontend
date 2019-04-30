import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import './MessagesPanel.css';
import NewMessage from '../NewMessage/NewMessage';
import Message from "../Message/Message";
import {onRecvMessageListAction} from "../../middlewares/onRecvMessageList";
import {onRecvNewMessageAction} from "../../middlewares/onRecvNewMessage";
import api from "../../constants/api";
import WEBSOCKET from '../../constants/websocket';
import Websocket from "react-websocket";
import {addPathAndQueries} from "../../utils/addPathAndQueries";

class MessagesPanel extends Component {
    componentDidMount() {
        this.props.recvMessageList({
            request: api.recvMessagesFromPublic,
            token: this.props.token
        });
    }

    onMessage(message) {
        this.props.recvNewMessage(message)
    }

    render() {
        return (
            <div className="MessagesPanel">
                <ul>
                    {this.props.messageList.map((message, index) => (
                        <li key={index}>
                            <Message {...message}/>
                        </li>)
                    )}
                </ul>
                <NewMessage/>
                <Websocket
                    url={addPathAndQueries(WEBSOCKET, null, [{param: "token", query: this.props.token}])}
                    onMessage={this.onMessage.bind(this)}
                />
            </div>
        );
    }
}

MessagesPanel.propTypes = {
    messageList: PropTypes.array
};

MessagesPanel.defaultProps = {
    messageList: []
};

const mapStateToProps = state => ({
    token: state.auth.token,
    messageList: state.recvMessageList.messageList,
});

const mapDispatchToProps = dispatch => ({
    recvMessageList: payload => dispatch(onRecvMessageListAction(payload)),
    recvNewMessage: payload => dispatch(onRecvNewMessageAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesPanel);
