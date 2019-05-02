import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router";
import ChatsPanel from "../components/ChatsPanel";
import MessagesPanel from "../components/MessagesPanel";
import NewMessage from "../components/NewMessage";
import pages from "../constants/pages"

class Conversations extends Component {
    render = () => {
        if (!this.props.token) {
            return <Redirect to={pages.authentication}/>;
        }

        return (
            <div className="container">
                <div className="row overflow-hidden px" style={{'height': '93vh'}}>
                    <ChatsPanel/>
                    <MessagesPanel/>
                </div>
                <div className="row border" style={{'height': '7vh'}}>
                    <div className="col fixed-bottom">
                        <NewMessage/>
                    </div>
                </div>
            </div>
        );
    };
}

const mapStateToProps = state => ({token: state.auth.token,});

export default connect(mapStateToProps)(Conversations);
