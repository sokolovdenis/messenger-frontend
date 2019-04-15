import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './SelfUser.css';
import { getSelfUser, findUsersByName } from './../Api.js';
import UsersList from './UsersList.js';


class SelfUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name : '',
            id : '',
            templateName : '',
            findedUsers : [{
                'name':'nady', 'id':'asdfdas'},
                {'name':'aa', 'id':'fdsfafa'}]
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        getSelfUser()
            .then(response =>
                response.json().then(user => ({user, response}))
            )
            .then(({user, response}) => {
                if (response.ok) {
                    this.setState({
                        'name' : user.name,
                        'id' : user.id
                    });
                } else if (response.status === 401) {
                    console.log('Need authenticate');
                }
            })
            .catch(e => console.log(e));
    }

    handleNameChange(event) {
        this.setState({'templateName': event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();

        console.log("It doesn't work");
        /*findUsersByName(this.state.templateName)
            .then( response => {
                console.log(response.data);
            })/*.then(({usersList, response}) => {
                if (response.ok) {
                    console.log(usersList);
                    //this.setState('findedUsers': response.data);
                } else if (response.status === 400) {
                    console.log("Some parameters aren't valid");
                } else if (response.status === 401) {
                    console.log("Need authentication");
                } else {
                    console.log(response.statusText);
                }
            }).catch(e => console.log("Error: ", e))*/;
    }

    render() {
        return (
            <div>
                <form className="SelfUser" onSubmit={this.handleSubmit}>
                    <h2 className="SelfUser-heading">{this.state.name} Page</h2>
                    <label htmlFor="inputName" className="sr-only">Find user by name: </label>
                    <input type="text" name="inputName" onChange={this.handleNameChange} className="form-control" placeholder="" required autoFocus />
                    <br/>
                    <br/>
                    <button className="btn btn-default" type="submit">Find user</button>
                </form>

                <UsersList users={this.state.findedUsers} />
            </div>
        );
    }
}

export default SelfUser;