import React, {Component} from 'react';
import { getUserInfo } from './api'
import './message.css'

class Message extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: ""
        };

        this.componentDidMount = this.componentDidMount.bind(this);
    };

    componentDidMount() {
        getUserInfo(this.props.userId)
        .then(userInfo => this.setState({name: userInfo.name}));
    }

    render() {
        // console.log("Message -> render()");
        return (
            <div>
                <div className="senderName"> <strong>{this.state.name}</strong> </div>
                <div> {this.props.text} </div>
                <div className="date"> {this.props.time} </div>
            </div>
        );
    }

}

export default Message;