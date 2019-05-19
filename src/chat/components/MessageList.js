import React, { Component } from 'react';
import Message from './Message';
import InfiniteScroll from 'react-infinite-scroller';
import '../css/MessageList.css'


class MessageList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="message-list">
                <div className="message-list-header">
                    <p>{this.props.showName(this.props.activeChatName)}</p>
                </div>
                <div className="message-list--history" ref={(ref) => this.messageList = ref}>
                    <div>
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.props.handleScroll}
                            hasMore={true || false}
                            isReverse={true}
                            useWindow={false}
                            loader={this.props.messages[0] && 
                                    this.props.messages[0].id !== 0 && 
                                    <div className="loader" key={0}>Loading ...</div>}
                            >
                            {this.props.messages.map((message, index) => (
                                <Message key={message.id + " " + index}
                                        ownerId={this.props.userId} 
                                        senderId={message.user}
                                        showName={this.props.showName}
                                        text={message.content}
                                        time={message.timestamp}
                                        selectConversation={this.props.selectConversation}
                                        />
                            ))}
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        )
    }
}

export default MessageList
