import React, { Component } from 'react';
import Message from './Message/Message';
import InfiniteScroll from 'react-infinite-scroller';
import './MessageList.css'


class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            readyToScroll: false
        }
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.listenScrollEvent = this.listenScrollEvent.bind(this);
    }

    scrollToBottom() {
        const scrollHeight = this.messageList.scrollHeight;
        const height = this.messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    componentDidMount() {
        const node = this.messageList;
        node.addEventListener('scroll', this.listenScrollEvent);
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        // хотел реализовать штуку, которая при появлении нового сообщения показывала бы стрелку вниз
        // а при написании собственного сообщения просто прокручивать вниз, но как разделять эти два события не понятно
        // поэтому при появлении нового сообщения не важно от кого прокручиваю вниз
        // а стрелка появляется при прокручивании наверх
        if(prevProps.myProps !== this.props.myProp) {
            this.scrollToBottom();
        }
    }

    componentWillUnmount() {
        const node = this.messageList;
        node.removeEventListener('scroll', this.listenScrollEvent);
    }

    listenScrollEvent() {
        const scrollHeight = this.messageList.scrollHeight;
        const height = this.messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        var readyToScroll = this.messageList.scrollTop !== maxScrollTop && 
                            this.messageList.scrollTop !== 0;
        if (readyToScroll !== this.state.readyToScroll) {
            this.setState({ readyToScroll: readyToScroll});
        }
    }

    render() {
        // что выводить если сообщений нет?
        return (
            <div className="msg-list">
                <div className="msg-header">
                    {this.props.showName(this.props.activeChatName)}
                </div>
                <div className="msg-history" ref={(ref) => this.messageList = ref}>
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
                {this.state.readyToScroll &&
                <button className="msg-bottom-btn" type="button" onClick={this.scrollToBottom}>
                    <i className="fa fa-arrow-down" aria-hidden="true"></i>
                </button>
                }
            </div>
        )
    }
}

export default MessageList