import React, { Component } from 'react';
import Message from './Message/Message';
import InfiniteScroll from 'react-infinite-scroller';
import './MessageList.css'


class MessageList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // что выводить если сообщений нет?
        return (
            <div>
                <div className="msg-header">
                    {this.props.showName(this.props.activeChatName)}
                </div>
                <div className="msg-history" >
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
        )
    }
}

export default MessageList