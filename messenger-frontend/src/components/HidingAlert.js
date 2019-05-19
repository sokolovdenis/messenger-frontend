import React, {Component} from 'react'

export class HidingAlert extends Component {
    constructor(props) {
        super(props);
        const {msg} = props;

        this.state = {msg: msg}
    }

    render() {
        if (this.state.msg !== '') {
            return <div className="alert alert-warning" role="alert">{this.state.msg}</div>
        } else {
            return '';
        }

    }
}