import React, { Component } from 'react';
import SignOut from './SignOut';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.handleSignOutButtonClick = this.handleSignOutButtonClick.bind(this);
  }

  handleSignOutButtonClick() {
    this.props.handleSignOutButtonClick();
  }

  render() {
    let signOut = this.props.token ? <SignOut handleSignOutButtonClick={this.handleSignOutButtonClick} /> : '';

    return (
      <nav className='navbar navbar-inverse fixed-top bg-dark'>
        <a className='navbar-brand' href='#'>Package</a>
        <div className='float-right'>
          {signOut}
        </div>
      </nav>
    );
  }
}
