import React, { Component } from 'react';

////////////////////////////////////////////////////////////////////////////////
const API_SIGNIN = 'http://messenger.westeurope.cloudapp.azure.com/api/authentication/signin'
const API_REGISTER = 'http://messenger.westeurope.cloudapp.azure.com/api/authentication/signup'


function fetchStatusCheck (response){
  console.log(response)
  switch (response.status) {
    case 200:
      return (response.json())
    case 400:
      return Promise.reject(response.text())
    default:
      return Promise.reject(Promise.resolve('Server reply: '+ response.status + '; ' + response.statusText))
  }
}

////////////////////////////////////////////////////////////////////////////////
//
// Страница регистрации аккаунта или логина (они почти не отличаются)
//
////////////////////////////////////////////////////////////////////////////////
class SignInPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",        // UI element
      email : "",      // UI element
      password: "",    // UI element
      remember: true,  // UI element
      requestingServer: false,  // page status
      warning: null,            // warning message to display
      mode: 'signin',
      url: API_SIGNIN
    };

    this.onButton          = this.onButton.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.signInSuccess     = this.signInSuccess.bind(this);
    this.setAlert          = this.setAlert.bind(this);
    this.linkRegister      = this.linkRegister.bind(this);
    this.linkSignIn        = this.linkSignIn.bind(this);
  }

  setAlert(message) {
    this.setState({ requestingServer: false, warning: message });
  }

  signInSuccess (json) {
    this.props.callback({page: 'messenger', token: json.token, expires: json.expires, remember: this.state.remember})
  }

  linkRegister (event) {
    event.preventDefault();
    this.setState({ mode: 'register', url: API_REGISTER, remember: true });
  }

  linkSignIn (event) {
    event.preventDefault();
    this.setState({ mode: 'signin', url: API_SIGNIN });
  }

  onButton(event) {
    event.preventDefault();
    // переключаемся в состояние ожидания ответа сервера
    this.setState({ requestingServer: true, warning: null });

    fetch(this.state.url, {
        method: 'post',
        body: JSON.stringify({login: this.state.email, password: this.state.password, name: this.state.user}),
        headers: { 'content-type': 'application/json' }
    })
      .then(fetchStatusCheck)
      .then(this.signInSuccess)
      .catch(err => err.then(this.setAlert))
  }

  handleInputChange(event) {
    switch (event.target.id){
      case 'inputEmail':
        this.setState({ email: event.target.value});
        break;
      case 'inputPassword':
        this.setState({ password: event.target.value});
        break;
      case 'inputUser':
        this.setState({ user: event.target.value});
        break;
      default:
        this.setState({ remember: event.target.checked });
        break;
    }
  }

  render() {
    return (
      <div className="center-page">
        <form className="form-signin text-center" onSubmit={this.onButton}>

          {/* -----------------   Приветсвие ----------------------*/}

          { this.state.mode === 'signin' ?
            <h3> Please sign in </h3> :
            <h3> Please register </h3>
          }

          { this.state.mode === 'signin' ?
            <p> Or <a href="/#" onClick={this.linkRegister}>register</a>, if you have not yet. </p> :
            <p> Already registered? <a href="/#" onClick={this.linkSignIn}>Sign in</a>. </p>
          }

          {/* -----------------   поле User Name ----------------------*/}
          { this.state.mode === 'signin' ||
            <label htmlFor="inputUser" className="sr-only">
              User name
            </label> }

          { this.state.mode === 'signin' ||
          	<input type="text" id="inputUser" className="form-control"
              placeholder="User name" value={this.state.user}
              onChange={this.handleInputChange} required autoFocus /> }

          {/* -----------------   поле Email  ----------------------*/}
        	<label htmlFor="inputEmail" className="sr-only">
            Email address
          </label>
        	<input type="email" id="inputEmail" className="form-control"
            placeholder="Email address" value={this.state.email}
            onChange={this.handleInputChange} required autoFocus />

          {/* -----------------   поле Password  ----------------------*/}
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
        	<input type="password" id="inputPassword" className="form-control"
            placeholder="Password" value={this.state.password}
            onChange={this.handleInputChange} required />

          {/* -----------------   чекбокс Remember me  ----------------------*/}
          { this.state.mode === 'signin' &&
            <div className="checkbox mb-3">
          		<label>
          			<input type="checkbox" value="remember-me" checked={this.state.remember} onChange={this.handleInputChange} /> Remember me
          		</label>
          	</div>
          }

          {/* -----------------   кнопка   ----------------------*/}
          { this.state.mode === 'signin' ?
            (
              this.state.requestingServer === true ?
                <button className="btn btn-lg btn-primary btn-block disabled">Signing in...</button> :
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            ):
            (
              this.state.requestingServer === true ?
                <button className="btn btn-lg btn-primary btn-block disabled">Registering...</button> :
                <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
            )
          }

          {/* ----------------- сообщение об ошибке   ----------------------*/}
          { this.state.warning === null ||
             <div className="alert alert-danger" role="alert">{this.state.warning}</div>
          }
        </form>
      </div>
    );
  }
}

export default SignInPage;
