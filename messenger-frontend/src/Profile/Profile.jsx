import React, {Component} from 'react'
import {history} from "../helpers/history";
export class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('user-token'),
            error: '',
            name: '',
            id: '',
        };
        this.loadData();
    }

    loadData() {
        if (!this.state.token) {
            return;
        }

        let me_url = "http://messenger.westeurope.cloudapp.azure.com/api/users/me";
        let promise = fetch(
            me_url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.state.token,
                },
            });


        promise.then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                let error = new Error(resp.statusText);
                error.response = resp;
                throw error
            }
        }).then((json) => {
            this.setState({name: json.name, id: json.id});
        }).catch(err => {
            Promise.resolve(err.response.text()).then(value => {
                this.setState({error: value});
                alert(value);
            });
        })
    }

    render() {
        const {name, id} = this.state;
        return (
            <div>
                <h1>Welcome, {name}</h1>
                <p>Your id: {id}</p>
                <button className="btn btn-outline-secondary" onClick={this.logout}>Log out</button>
            </div>
        );
    }

    logout() {
        localStorage.removeItem('user-token');
        history.push("/");
    }
}
