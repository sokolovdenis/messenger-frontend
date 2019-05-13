import React, {Component} from 'react';
import { getUser } from './api';
import "./App.css"

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            time: this.prepareTime(this.props.time),
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    prepareTime(time) {
        let time_arr = time.split("T");
        let minutes = time_arr[1].split(".")[0];
        time_arr[1] = minutes;
        return time_arr.join(" ");
    }

    componentDidMount() {
        getUser(this.props.user).then(user => this.setState({user: user.name}));
    }

    render() {
        return(
            <div>
                <div>
                    {this.state.user}
                </div>
                <div>
                    {this.props.msg}
                </div>
                <div className="MessageTime">
                    {this.state.time}
                </div>
            </div>

        )
    }
}

export default Message;
