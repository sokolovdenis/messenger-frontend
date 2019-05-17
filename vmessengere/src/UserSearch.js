import React, { Component } from "react";
import { GetUserByName } from "./requests.js"

export default class UserSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            callback: props.callback
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        let chat = { name: this.state.text };
        let promise = GetUserByName(this.state.text);
        promise.then(json => {
            if (json.length > 0) {
                chat.participant = json[0].id;
                this.state.callback(chat);
            } else {
                alert("User wasn't found");
                console.log(json);
            }
        });

    }

    handleChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.text} onChange={this.handleChange} />
                <input type="submit" value="Search" />
            </form>
        );
    }
}
