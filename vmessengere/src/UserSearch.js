import React, { Component } from "react";
import { GetUserByName } from "./requests.js"
import { Form, FormGroup, FormControl, Button, ListGroup } from "react-bootstrap";

export default class UserSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            result: null,
            callback: props.callback
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        let promise = GetUserByName(this.state.text);
        promise.then(json => {
            if (json.length > 0) {
                this.setState({result: json});
            } else {
                alert("User wasn't found");
                console.log(json);
            }
        });
    }

    handleClick = (key, e) => {
        e.preventDefault();
        let user = this.state.result.find(value => value.id === key);
        user.participant = user.id;
        user.id = null;
        this.state.callback(user);
        this.setState({result: null});
    }

    handleChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    renderResult() {
        return(
            <div>
                <ListGroup>{this.state.result.map(user =>
                    <ListGroup.Item
                        key={user.id}
                        action
                        onClick={this.handleClick.bind(null, user.id)}>
                        <p>{ user.name }</p>
                        <p>{ user.id }</p>
                    </ListGroup.Item>)}
                </ListGroup>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="search_text">
                        <FormControl
                            type="text"
                            value={this.state.text}
                            onChange={this.handleChange}
                            label="Search user"
                        />
                    <Button type="submit">Search User</Button>
                    </FormGroup>               
                </Form>
                { this.state.result === null
                    ? <p></p>
                    : this.renderResult() }
            </div>
        );
    }
}
