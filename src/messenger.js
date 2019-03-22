import React, { Component } from 'react';

////////////////////////////////////////////////////////////////////////////////
//
// основная страница мессенджера
//
////////////////////////////////////////////////////////////////////////////////
class Messenger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      warning: null            // warning message to display
    };

//    this.onButton          = this.onButton.bind(this);
  }
  render() {
    return (
      <div>
        <h1> Типа окно мессенджера </h1>
        <p> Token: {this.props.token} </p>
      </div>
    );
  }
}

export default Messenger;
