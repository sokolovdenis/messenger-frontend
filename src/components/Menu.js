import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Menu.css';
import SelfUser from './SelfUser.js';
import Messenger from './Messenger.js';


class Menu extends Component {
    constructor() {
        super();

        this.selfPage = this.selfPage.bind(this);
        this.messenger = this.messenger.bind(this);
    }

    selfPage() {
        ReactDOM.render(
            <SelfUser />,
            document.getElementById('root')
        );
    }

    messenger() {
        ReactDOM.render(
            <Messenger />,
            document.getElementById('root')
        );
    }

    render() {
        return (
            <div>
                <button className="btn" type="button" onClick={this.selfPage}>Self Page</button>
                <button className="btn" type="button" onClick={this.messenger}>Messenger</button>
            </div>
        );
    }
}

export default Menu;