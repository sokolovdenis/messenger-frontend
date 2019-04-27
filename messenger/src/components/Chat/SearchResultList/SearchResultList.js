import React, { Component } from 'react';
import SearchResult from './SearchResult/SearchResult'
import './SearchResultList.css'


class SearchResultList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],  // здесь будем хранить готовый к отображению список
        };
        this.processInput = this.processInput.bind(this);
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if(prevProps.results !== this.props.results) {
            // У this.props.results изменилось значение
            // Поэтому мы можем выполнять любые операции для которых
            // нужны новые значения и/или выполнять сайд-эффекты
            // вроде AJAX вызовов с новым значением - this.props.results
            this.processInput();
          }
    }

    processInput() {
        console.log('process Input');
        this.setState(function(prevState, props) {
            var searchResults = props.results.map(
                function(searchResult) {
                    // у меня есть name и id
                    // нужно достать text и date
                    // найдем уже существуещее обсуждение с этим человеком
                    var conversation = props.chats.find(
                        function(element, index, array) {
                            if (element.participant == searchResult.id) {
                                return true;
                            }
                            return false;
                        }
                    )
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
        // что выводить если сообщений нет?
        // если мы уже общались с пользователем, то выводим его ник и последнее сообщение
        // иначе просто имя
        // желательно выводить сначала тех с кем общались (не знаю зачем, может и не надо)

        // result.id совпадает с id пользователя
        // activeChatName нужно сравнивать с result.id
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