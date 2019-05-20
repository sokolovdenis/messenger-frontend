import React from "react";
import './main.css';
import { Redirect } from "react-router-dom"


export class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onClickAbout = this.onClickAbout.bind(this);
        this.onSignOut = this.onSignOut.bind(this);
        this.state = {
            to: ''
        }
    }

    onClickAbout(e) {
        e.preventDefault();
        this.setState({
            to: 'about'
        })
    }
    onSignOut(e) {
        e.preventDefault();
        localStorage.setItem('token', '');
        this.setState({
            to: 'start'
        })
    }
    render() {
        switch (this.state.to) {
            case 'about': return (
                <Redirect to='/about'/>
            );
            case 'start': return (
                <Redirect to='/'/>
            );
            default:  return (
                <div id='main'>
                    This is main page.
                    <div className='button' onClick={this.onClickAbout}>About me</div>
                    <div className='button'>Public chat</div>
                    <div className='button'>Private chats</div>
                    <div className='search' id='search-title'>Search people by name:</div>
                    <input id='search-field'/>
                    <div className='button' onClick={this.onSignOut}>Sign out</div>
                </div>
            );

        }
    }
}
export default MainComponent;