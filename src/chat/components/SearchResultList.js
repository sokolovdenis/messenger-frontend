import React, { Component } from 'react';
import SearchResult from './SearchResult'
import '../css/SearchResultList.css'


class SearchResultList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: []
        };
        this.processInput = this.processInput.bind(this);
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if(prevProps.results !== this.props.results) {
            this.processInput();
          }
    }

    processInput() {
        console.log('process Input');
        this.setState(function(prevState, props) {
            let searchResults = props.results.map(
                function(searchResult) {
                    let conversation = props.chats.find(
                        function(element, index, array) {
                            if (element.participant === searchResult.id) {
                                return true;
                            }
                            return false;
                        }
                    );
                    if (typeof conversation == "undefined") {
                        searchResult.text = null;
                        searchResult.date = null;
                    }
                    else {
                        searchResult.text = conversation.lastMessage.content;
                        searchResult.date = conversation.lastMessage.timestamp;
                    }
                    return searchResult;
                }
            );
            return {searchResults: searchResults}
        });
    }
    render() {
        return (
            <div className="inbox-chat">
                {this.state.searchResults.map((result, index) => (
                    <SearchResult key={result.id + " " + index}
                            activeChatName={this.props.activeChatName}
                            id={result.id}
                            name={result.name}
                            showName={this.props.showName}
                            text={result.text}
                            date={result.date}
                            selectConversation={this.props.selectConversation}
                    />
                ))}
            </div>
        )
    }
}

export default SearchResultList
