import React, { Component } from 'react';
import TimeAgo from 'react-timeago'
import './SearchResult.css'


class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        if (this.props.activeChatName != this.props.id) {
            this.props.selectConversation(this.props.id);
        }
    }

    render() {
        var chatListClassName = "chat-list";
        if (this.props.activeChatName == this.props.id) {
            chatListClassName = "chat-list active-chat";
        }
        /*this.props.text - это последнее сообщение в обсуждении */
        return (
            <div className={chatListClassName} onClick={this.handleClick}>
                <div className="chat-people">
                    <div className="chat-img"> 
                        <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> 
                    </div>
                    <div className="chat-ib">
                        <h5>
                            {this.props.showName(this.props.id, this.props.name)}
                            {   this.props.date && 
                                <span className="chat-date">
                                    <TimeAgo date={this.props.date} />
                                </span>
                            }
                        </h5>
                        {   this.props.text && 
                            <p>{this.props.text}</p>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchResult