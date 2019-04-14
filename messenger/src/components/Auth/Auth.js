import React, { Component } from 'react'
import './Auth.css';
import 'bootstrap/dist/css/bootstrap.css'

class Auth extends Component {
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
        this.setState({ mode: 'register', remember: true });
      }
    
      linkSignIn (event) {
        event.preventDefault();
        this.setState({ mode: 'signin'});
      }
    
      onButton(event) {
        event.preventDefault();
        // переключаемся в состояние ожидания ответа сервера
        this.setState({ requestingServer: true, warning: null });
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
          <div className="text-center">
            <form className="form-signin" onSubmit={this.onButton}>
              <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
              
              {/* -----------------   Приветсвие ----------------------*/}
    
              { this.state.mode === 'signin' ?
                <h1 class="h3 mb-3 font-weight-normal"> Please sign in </h1> :
                <h1 class="h3 mb-3 font-weight-normal"> Please register </h1>
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
              {/* разобраться как выровнять по высоте*/}
              <h1 class="h3 mb-3 font-weight-normal"> Or </h1>
              { this.state.mode === 'signin' ?
                (
                    this.state.requestingServer === true ?
                    <button className="btn btn-lg btn-primary btn-block disabled">Sign up</button>:
                    <button className="btn btn-lg btn-primary btn-block" onClick={this.linkRegister}>Sign up</button>
                ):
                (
                    this.state.requestingServer === true ?
                    <button className="btn btn-lg btn-primary btn-block disabled">Sign in</button>:
                    <button className="btn btn-lg btn-primary btn-block" onClick={this.linkSignIn}>Sign in</button>
                )
              }

              {/* ----------------- сообщение об ошибке   ----------------------*/}
              { this.state.warning === null ||
                 <div className="alert alert-danger" role="alert">{this.state.warning}</div>
              }
              <p class="mt-5 mb-3 text-muted">&copy; 2019</p>
            </form>
          </div>
        );
      }
}

export default Auth