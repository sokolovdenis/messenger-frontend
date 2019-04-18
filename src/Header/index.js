import logo from './logoIcon64.png'; /* нагуглинная картинка */
import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.handleSingOutButtonOnClick = this.handleSingOutButtonOnClick.bind(this)
    }
    handleSingOutButtonOnClick() {
        this.props.singOut();
    }
    render() {
        return (
            <header id="header">
                <h1>
                    <img src={logo} alt='Логотип' />
                    Чат 2019
                    </h1>
                <SingOutButton userName={this.props.userName} handleSingOutButtonOnClick={this.handleSingOutButtonOnClick} />
            </header>);

    }
}

export default Header;

export class SingOutButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleSingOutButtonOnClick = this.handleSingOutButtonOnClick.bind(this);
    }
    handleSingOutButtonOnClick() {
        this.props.handleSingOutButtonOnClick();
    }
    render() {
        if (this.props.userName === '') {
            return (<div />);
        }
        else {
            return (
                <div id="ProfileInfo">
                    <div id="ProfileInfo-UserName" className="ProfileInfoLabel">
                        {this.props.userName}
                    </div>
                    <div id="ProfileInfo-id" className="ProfileInfoLabel">
                        <button type="button" className="link-button-signout" onClick={this.handleSingOutButtonOnClick}>
                            Выход
                    </button>
                    </div>
                </div>
            );
        }
    }
}
