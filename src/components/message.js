import React, {Component} from 'react';
import {getUserInfo} from './api'
import './message.css'

class Message extends Component {

    constructor(props) {
        super(props);
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
        return (
            <div className="container">
                <p>{this.state.name + ': ' + this.props.text} </p>
                <span className="time-right"> {this.props.time} </span>
            </div>
        );
    }

}
/*
<div class="container">
  <p>Hello. How are you today?</p>
  <span class="time-right">11:00</span>
</div>

            <div>
                <div> {this.state.name} </div>
                <div> {this.props.text} </div>
                <div> {this.props.time} </div>
            </div>

 */
export default Message;