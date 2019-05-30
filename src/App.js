import React, { Component } from "react";
import {CircleLoader} from "react-spinners";

import "./App.css";
import RegisterForm from "./RegisterForm";
import Chat from "./Chat";

const backend_url = "http://messenger.westeurope.cloudapp.azure.com/";

class App extends Component {
  state = {
    auth: null,
    token: localStorage.getItem("token"),
    errorRegister: false,
    errorLogin: false
  };

  componentDidMount() {
    setTimeout(this.getCurrentUser, 1000);
  }

  getCurrentUser = () => {
    let url = backend_url + "api/users/me/";
    this.setState({
      auth: null
    });

    fetch(url, {
      headers: {
        "Authorization": "Bearer " + this.state.token
      }
    })
      .then(response => response.json())
      .then(() => {
        this.setState({
          auth: true
        });
      })
      .catch(() => {
        this.setState({
          auth: false
        });
      });
  };

  onRegister = (login, password, name) => {
    let obj = {
      login: login,
      password: password,
      name: name
    };
    this.setState({
      auth: null
    });

    let url = backend_url + "api/authentication/signup";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
      .then(response => {
        if (200 <= response.status && response.status < 300) {
          return response.json();
        } else if (response.status >= 400) {
          this.setState({
            auth: false,
            errorRegister: true
          });
        }
      })
      .then(response => {
        this.setState({
          auth: true,
          token: response.token
        });
        localStorage.setItem("token", response.token);
      })
      .catch(error => {
        console.log(error);
      });
  };

  onLogin = (login, password) => {
    let obj = {
      login: login,
      password: password
    };
    this.setState({
      auth: null
    });

    let url = backend_url + "api/authentication/signin";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
      .then(response => {
        if (200 <= response.status && response.status < 300) {
          return response.json();
        } else if (response.status >= 400) {
          this.setState({
            auth: false,
            errorLogin: true
          });
        }
      })
      .then(response => {
        this.setState({
          auth: true,
          token: response.token
        });
        localStorage.setItem("token", response.token);
      })
      .catch(error => {
        console.log(error);
      });
  };

  onLogout = () => {
    localStorage.setItem("token", '');
    this.setState({
      auth: false,
      token: ''
    });
  }

  render() {
    const { errorRegister, errorLogin } = this.state;
    return (
      <div className="App">
        {this.state.auth === true ? (
          <Chat token={this.state.token} onLogout={this.onLogout}/>
        ) : this.state.auth === false ? (
          <RegisterForm
            onRegister={this.onRegister}
            errorRegister={errorRegister}
            onLogin={this.onLogin}
            errorLogin={errorLogin}
          />
        ) : (
          <div className='Loader'>
            <CircleLoader 
              sizeUnit={"px"}
              size={150}
              color='#FFC107'
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
