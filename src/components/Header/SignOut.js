import React, { Component } from 'react';
import './Header';

export default class SignOut extends Component {
  constructor(props) {
    super(props);

    this.handleSignOutButtonClick = this.handleSignOutButtonClick.bind(this);
  }

  handleSignOutButtonClick() {
    this.props.handleSignOutButtonClick();
  }

  render() {
    return (
      <button className='btn btn-outline-success' type='button' onClick={this.handleSignOutButtonClick}>
        Sign Out
      </button>
    );
  }
}
