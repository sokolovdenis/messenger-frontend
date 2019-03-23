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

//    this.onButton          = this.onButton.bind(this);
  }
  render() {
    return (
      <div className="messenger">
          <div className="msg-header">
              <strong> User name </strong>
              <a href="" class="text-muted">(Log out)</a>
          </div>
          <div className="msg-search">
              <input type="text" class="form-control" id="searchSting" placeholder="Search user" />
          </div>
          <div className="msg-list">
            <ul class="list-group shadow ">
              <li class="list-group-item active">Cras justo odio</li>
              <li class="list-group-item">Dapibus ac facilisis in</li>
              <li class="list-group-item">Morbi leo risus</li>
              <li class="list-group-item">Porta ac consectetur ac</li>
              <li class="list-group-item">Vestibulum at eros</li>
            </ul>
          </div>
          <div className="msg-dialogue text-center">
              No conversations currently selected
          </div>
            <div className="msg-message">
              <form>
                <input type="text" class="form-control" id="messageText" placeholder="Enter message..." />
              </form>
          </div>
      </div>
    );
  }
}

export default Messenger;
