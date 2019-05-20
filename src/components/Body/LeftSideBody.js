import React, { Component } from 'react';
import ConversationCardList from './ConversationCardList';
import FindUser from './FindUser';

export default class LeftSideBody extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className='col-5 sidebar'>
        <FindUser
          token={this.props.token}
          changeConversation={this.props.changeConversation} />
        <ConversationCardList
          token={this.props.token}
          conversationCards={this.props.conversationCards}
          changeConversation={this.props.changeConversation} />
      </nav>
    )
  }
}
