import React, { Component } from "react";

export default class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="Main">
                Hello {localStorage.getItem('my_name')}
            </div>
        );
    }
}