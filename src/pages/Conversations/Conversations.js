import React, {Component} from 'react';
import './Conversations.css';
import ChatsPanel from "../../components/ChatsPanel/ChatsPanel";
import MessagesPanel from "../../components/MessagesPanel/MessagesPanel";
import pages from "../../constants/pages"

import {connect} from "react-redux";
import {Redirect} from "react-router";

class Conversations extends Component {
    render = () => {
        if (!this.props.token) {
            return <Redirect to={pages.authentication}/>;
        }

        return (
            <div className="Conversations">
                <ChatsPanel/>
                <MessagesPanel/>
            </div>
        );
    };
}

const mapStateToProps = state => ({token: state.auth.token,});

export default connect(mapStateToProps)(Conversations);
