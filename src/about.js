import React from "react";
import $ from "jquery";
import './about.css';
import { Redirect } from "react-router-dom"

let baseUrl = 'http://messenger.westeurope.cloudapp.azure.com';

export class AboutComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onClickBack = this.onClickBack.bind(this);
        this.state = {
            isClicked: false,
            name: '',
            id: ''
        };
    }
    componentDidMount() {
        let url = baseUrl + '/api/users/me';
        let self = this;
        $.ajax({
            type: "GET",
            url: url,
            contentType: 'application/json',
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem('token')
            },
            success: function (data) {
                self.setState({
                    name: data['name'],
                    id: data['id']
                });
                // alert(localStorage.getItem('token'));
                // self.setState({
                //     isClicked: true
                // });
            },
            error: function(data)
            {
                alert("Sorry. Something went wrong.");
            }
        });
    }
    onClickBack (e) {
        e.preventDefault();
        this.setState({
            isClicked: true
        })
    }

    render() {
        return !this.state.isClicked ? (
            <div id='main-body'>
                This page contain your profile information.
                <div className="info-field"><span className="title">ID:</span> {this.state.id} </div>
                <div className="info-field"><span className="title">Name:</span> {this.state.name} </div>
                <div className='button-back' onClick={this.onClickBack}>Back to main page</div>
            </div>
        ) : (
            <Redirect to='/main'/>
        )
    }
}
export default AboutComponent;