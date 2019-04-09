import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import './MessagesPanel.css';
import NewMessage from '../NewMessage/NewMessage';
import Message from "../Message/Message";
import ChatInfo from "../ChatInfo/ChatInfo";
import {onRecvMessageListAction} from "../../middlewares/onRecvMessageList";
import api from "../../constants/api";

class MessagesPanel extends Component {
    componentDidMount() {
        this.props.recvMessageList({
            request: api.recvMessagesFromPublic,
            parameters: {
                path: null,
                queries: [
                    {param: "from", query: 0},
                    {param: "count", query: 100},
                ],
            },
            token: this.props.token
        });
    }

    render() {
        return (
            <div className="MessagesPanel">
                <ChatInfo/>
                <ul>
                    {this.props.messageList.map((message, index) => (
                        <li key={index}>
                            <Message {...message}/>
                        </li>)
                    )}
                </ul>
                <NewMessage/>
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
    token : state.auth.token,
    messageList: state.recvMessageList.messageList,
});

const mapDispatchToProps = dispatch => ({
    recvMessageList: (payload) => dispatch(onRecvMessageListAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesPanel);
