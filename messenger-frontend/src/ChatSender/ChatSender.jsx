import React, {Component} from 'react';

import './ChatSender.css';

export class ChatSender extends Component {

    constructor(props) {
        super(props);
        this.state = {message: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.handleSendMessage(this.state.message);
        this.setState({message:''});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col col-md-10">
                        <input type="text" className="form-control form-control-lg" name="message" placeholder="Enter message" value={this.state.message} onChange={this.handleChange}/>
                    </div>
                    <div className="col col-md-2">
                        <button className="btn btn-primary btn-lg btn-block" type="submit"> Send </button>
                    </div>
                </div>

            </form>
        )
    }
}