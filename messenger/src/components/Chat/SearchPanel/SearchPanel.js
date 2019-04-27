import React, { Component } from 'react';
import './SearchPanel.css'


class SearchPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        var query = event.target.value;
        this.setState({
            query: query
        });
        this.props.sendQuery(query);
    }

    render() {
        return (
            <div className="headind-srch">
                <div className="srch-bar">
                    <div className="stylish-input-group">
                        <input type="text" className="search-bar" placeholder="Search"
                            onChange={this.handleChange} />
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchPanel