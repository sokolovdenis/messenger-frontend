import React, {Component} from 'react';
import './ChatsPanel.css';
import SearchPanel from '../SearchPanel/SearchPanel';
import ChatPreview from '../ChatPreview/ChatPreview';
import {onRecvChatListAction} from "../../middlewares/onRecvChatList";
import api from '../../constants/api';
import {connect} from "react-redux";
import PropTypes from "prop-types";

class ChatsPanel extends Component {
    componentDidMount() {
        this.props.recvChatList({ request: api.getConversations, token: this.props.token });
    }

    render() {
        return (
            <div className="ChatsPanel">
                <SearchPanel/>
                <ul>
                    {this.props.chatList.map((chat, index) => (
                        <li key={index}>
                            <ChatPreview {...chat}/>
                        </li>)
                    )}
                </ul>
            </div>
        )
    };
}

ChatsPanel.propTypes = {
    chatList: PropTypes.array
};

ChatsPanel.defaultProps = {
    chatList: []
};

const mapStateToProps = state => ({
    token : state.auth.token,
    chatList: state.recvChatList.chatList,
});

const mapDispatchToProps = dispatch => ({
    recvChatList: (payload) => dispatch(onRecvChatListAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatsPanel);
