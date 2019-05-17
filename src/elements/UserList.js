import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import "./UserList.css"

export default class UserList extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            userName:""
        };
    }

    getUserName(userId){
        if ( this.props.knownUserMap.has(userId) ){
            return this.props.knownUserMap.get(userId);
        } else {
            return userId;
        }
    }

    handleClick(idx, event){
        if (idx === 'public') {
            this.props.updateChat('public', true);
        } else {
            this.props.updateChat(idx, false);
        }

    }

    handleSubmit(event){
        event.preventDefault();
        this.props.findUser(this.state.userName);
        this.setState({userName:""})
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    validateForm() {
        return this.state.userName.length > 0;
    }

    render() {
        let users = Array.from(this.props.userIds);

        return (
            <div className="User-list">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="userName">
                        <Form.Label>Find User</Form.Label>
                        <Form.Control
                            autoFocus
                            type="userName"
                            value={this.state.userName}
                            onChange={this.handleChange}
                        />
                    </Form.Group>

                    <Button
                        block
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        find
                    </Button>

                </Form>
                <b> {this.props.title} </b>

                <li className="User-Item">
                    <b onClick={this.handleClick.bind(this, 'public')}>
                        Public Chat
                    </b>

                </li>
                {users.map(user=>
                    {
                        return <li key={user} className='User-Item'>

                            <b onClick={this.handleClick.bind(this, user)}>
                                {this.getUserName(user)}
                            </b>

                        </li>
                    }
                )
                }
            </div>
        );


    }
}