import {getuser} from "./Api";
import React, {Component} from 'react';

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            time: props.message.timestamp.replace('T', ' ').substr(0, 19)
        }

    }

    componentDidMount() {
        getuser(this.props.message.user).then(response => {
            this.setState({username: response.name});
        });

    }

    render() {
        return (
            <div className="Message">
                <div className="MessageHeader">
                    <label> {this.state.username} </label>
                    <label> {this.state.time} </label>
                </div>
                <label id="content"> {this.props.message.content} </label>
            </div>
        );
    }



}

export default Message;