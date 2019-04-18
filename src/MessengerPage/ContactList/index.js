import React from 'react';
import ContactItem from './ContactItem'

class ContactList extends React.Component {
    constructor(props) {
        super(props);
        this.newConversation = this.newConversation.bind(this);

        this.findUserName = this.findUserName.bind(this);
    }

    findUserName(userId) {
        let result = [];
        if (this.props.userNames)
          result = this.props.userNames.filter(item => item.id === userId);
    
        if (result.length === 0) {
          return 'поиск...';
        }
        else {
          return result[0].name;
        }
      }
      

    newConversation(userId) {
        this.props.newConversation(userId)
    }

    render() {
        return (
            <div id = "contactListItems">
                {this.props.conversations.map(item => (
                      <ContactItem key={item.id}
                        token = {this.props.token}
                        userId={item.participant}                    
                        content={item.lastMessage.content}
                        timestamp={item.lastMessage.timestamp}
                        newConversation = {this.newConversation}

                        userName={this.findUserName(item.participant)}
                      >
                      </ContactItem>)) }
            </div>
        );
    }
}

export default ContactList;