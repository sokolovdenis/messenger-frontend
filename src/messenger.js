import React, { Component } from 'react';

const API_ME = 'http://messenger.westeurope.cloudapp.azure.com/api/users/me'

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

    this.linkLogOut          = this.linkLogOut.bind(this);
  }

  linkLogOut (event) {
    event.preventDefault();
    this.props.callback({page: 'login', token: null})
  }

  render() {
    return (
      <div className="messenger">
          <div className="msg-header">
              <strong> User name </strong>
              <a href="" className="text-muted" onClick={this.linkLogOut}>(Log out)</a>
          </div>
          <div className="msg-search">
              <input type="text" className="form-control" id="searchSting" placeholder="Search user" />
          </div>
          <div className="msg-list">
            <ul className="list-group shadow ">
              <li className="list-group-item active">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Morbi leo risus</li>
              <li className="list-group-item">Porta ac consectetur ac</li>
              <li className="list-group-item">Vestibulum at eros</li>
            </ul>
          </div>
          <div className="msg-dialogue text-center">
              No conversations currently selected
          </div>
            <div className="msg-message">
              <form>
                <input type="text" className="form-control" id="messageText" placeholder="Enter message..." />
              </form>
          </div>
      </div>
    );
  }
}

export default Messenger;
