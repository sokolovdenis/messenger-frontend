import React, { Component } from 'react';
import ConversationCard from './ConversationCard';

export default class ConversationCardList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className='__conversation__card__list'>
        Your conversations
        <ul className='navbar-nav'>
          {this.props.conversationCards.map(conversationCard => (
            <ConversationCard 
              token={this.props.token}
              conversationCard={conversationCard}
              changeConversation={this.props.changeConversation} />
          ))}
        </ul>
      </nav>
    );
  }
}
