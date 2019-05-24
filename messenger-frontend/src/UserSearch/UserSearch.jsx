import React, {Component} from 'react'

export class UserSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
        if (name === "query") {
            this.props.handleSearch(value);
        }
    }

    render() {
        return (
        <input className="form-control form-control-lg" type="text" placeholder="Search for users" name="query" value={this.state.query} onChange={this.handleChange} />
        );
    }

}