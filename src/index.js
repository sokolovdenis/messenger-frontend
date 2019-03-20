import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';



////////////////////////////////////////////////////////////////////////////////
//
// Страница регистрации аккаунта
//
////////////////////////////////////////////////////////////////////////////////
class SignInPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email : "",
      password: "",
      remember: true,
      requestingServer: false
    };

    this.onSignIn = this.onSignIn.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onSignIn(event) {
    //this.props.callback("stop");
    this.setState({ requestingServer: true });
    event.preventDefault();
  }

  handleInputChange(event) {
    switch (event.target.id){
      case 'inputEmail':
        this.setState({ email: event.target.value});
        break;
      case 'inputPassword':
        this.setState({ password: event.target.value});
        break;
      default:
        this.setState({ remember: event.target.checked });
        break;
    }
  }

  render() {
    return (
      <form className="form-signin text-center" onSubmit={this.onSignIn}>
      	<h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
      	<label htmlFor="inputEmail" className="sr-only">Email address</label>
      	<input type="email" id="inputEmail" className="form-control" placeholder="Email address" value={this.state.email} onChange={this.handleInputChange} required autoFocus />
      	<label htmlFor="inputPassword" className="sr-only">Password</label>
      	<input type="password" id="inputPassword" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} required />
      	<div className="checkbox mb-3">
      		<label>
      			<input type="checkbox" value="remember-me" checked={this.state.remember} onChange={this.handleInputChange} /> Remember me
      		</label>
      	</div>
         { this.state.requestingServer === true ?
           <button className="btn btn-lg btn-primary btn-block disabled">Signing in...</button> : 
           <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
         }
      	<p className="mt-5 mb-3 text-muted" style={{width: 330}}>&copy; Andrey Isaev 2017-2019</p>
      </form>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////
//
// Основной класс, который отвечает за переключение между режимами
//
////////////////////////////////////////////////////////////////////////////////
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {page: "login"};
    this.switchPage = this.switchPage.bind(this);
  }

  // коллбэк для вызова из вложенных элементов
  switchPage(p) {
    this.setState({page: p});
  }

  render() {
    const page = this.state.page;
    switch(page) {
      case "login":
        return ( <SignInPage callback={this.switchPage}/> );
      default:
        return ( <h1>Unknown App state: {this.state.page} </h1> );
    }
  }
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
