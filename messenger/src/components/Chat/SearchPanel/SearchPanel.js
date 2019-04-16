import React, { Component } from 'react';
import './SearchPanel.css'


class SearchPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            request: 'смысл жизни',
        }
    }

    render() {
        return (
            <div className="headind-srch">
                <div className="srch-bar">
                    <div className="stylish-input-group">
                        <input type="text" class="search-bar"  placeholder="Search" />
                        <span className="input-group-addon">
                            <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                        </span> 
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchPanel