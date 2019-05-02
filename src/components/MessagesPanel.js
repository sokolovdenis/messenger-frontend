import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Websocket from "react-websocket";
import Message from "./Message";
import api from "../constants/api";
import WEBSOCKET from '../constants/websocket';
import {onRecvMessageListAction} from "../middlewares/onRecvMessageList";
import {onRecvNewMessageAction} from "../middlewares/onRecvNewMessage";
import {addPathAndQueries} from "../utils/addPathAndQueries";

class MessagesPanel extends Component {
    componentDidMount() {
        this.recvMessageList();
    }

    componentDidUpdate(prevProps) {
        const scroller = document.getElementById("scroller");
        scroller.scrollTop = scroller.scrollHeight;

        if (prevProps.conversationId !== this.props.conversationId) {
            this.recvMessageList();
        }
    }

    onMessage(message) {
        this.props.recvNewMessage(message)
    }

    recvMessageList() {
        this.props.recvMessageList({
            request: api.recvMessagesFrom,
            conversationId: this.props.conversationId,
            token: this.props.token
        });
    }

    render() {
        return (
            <div id="scroller" className="col-7 pt-5 overflow-auto border" style={{'height':'93vh'}}>
                {this.props.messageList.length === 0
                    ? null
                    : (<ul className="list-group">{
                            this.props.messageList.map((message, index) => (
                                <li className="list-group-item" key={index}>
                                    <Message {...message}/>
                                </li>))}
                        </ul>)}
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
    messageList: [],
    conversationId: "public",
};

const mapStateToProps = state => ({
    token: state.auth.token,
    messageList: state.recvMessageList.messageList,
    conversationId: state.recvMessageList.conversationId,
});

const mapDispatchToProps = dispatch => ({
    recvMessageList: payload => dispatch(onRecvMessageListAction(payload)),
    recvNewMessage: payload => dispatch(onRecvNewMessageAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesPanel);
