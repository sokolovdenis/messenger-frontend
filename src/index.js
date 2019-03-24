import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';
import './messenger.css';
import './signin.css';

import Messenger from './messenger.js'
import SignInPage from './signin.js'

// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([.$?*|{}()[]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// устанавливаем новое значение cookie
function setCookie(name,value,expires) {
    document.cookie = name + "=" + (value || "")  + "; expires=" + expires + "; path=/";
}

function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}

////////////////////////////////////////////////////////////////////////////////
//
// Основной класс, который отвечает за переключение между режимами
//
////////////////////////////////////////////////////////////////////////////////
class App extends Component {
  constructor(props) {
    super(props);

    let token = getCookie('token') || '';
    this.state = {
      token:      token,
      page:       (token === '') ? 'login' : 'messenger'
    };

    this.switchPage = this.switchPage.bind(this);
  }

  // коллбэк для вызова из вложенных элементов
  switchPage(p) {
    this.setState(p);

    console.log('switch page:')
    console.log(p);

    // сохраняем токен в куки
    if ( p.token !== undefined ){
      if ( p.token === '' || p.token === null || p.remember === false )
          eraseCookie('token');
      else
          setCookie('token',p.token,p.expires);
    }
  }

  render() {
    const page = this.state.page;
    switch(page) {
      case "login":
        return ( <SignInPage callback={this.switchPage}/> );
      case "messenger":
        return ( <Messenger callback={this.switchPage} token={this.state.token} /> );
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
