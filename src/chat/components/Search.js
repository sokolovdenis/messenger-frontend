import React, { Component } from 'react';
import '../css/Search.css'


class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
        };

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        let query = event.target.value;
        this.setState({
            query: query
        });
        this.props.sendQuery(query);
    }

    render() {
        return (
            <div className="search">
                <div className="search_form">
                    <input type="text" className="search_bar" placeholder="Please enter a name..." onChange={this.handleChange} />
                </div>
            </div>
        )
    }
}

export default Search
