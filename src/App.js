import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch , Redirect} from 'react-router-dom';
import SignIn from './Login.js'
import SignUp from './SignUp.js'
import Messenger from './Messenger.js'
import './App.css';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      token:"",
      history: createBrowserHistory()
    }
    
  }
  onTokenRecieve = (token)=>{
    localStorage.setItem("token", token)
    this.setState(
      {
      "token" : token
      }
    )
    this.state.history.push('/');
}
  render() {
    return (
    <Router history={this.state.history}>
    <Switch>
      <Route exact path = "/login" render = {
        ()=><SignIn onTokenRecieve = {(token)=>this.onTokenRecieve(token)} />
      }>
      </Route>
      <Route exact path = "/" render = {()=>
        localStorage.getItem("token") ? <Messenger /> : <Redirect to={{ pathname: '/login' }} />
      }>
      </Route>
      <Route exact path = "/signup" render = {
        ()=> <SignUp onTokenRecieve = {(token)=>this.onTokenRecieve(token)} />
      }>
      </Route>
    </Switch>
    </Router>
    )
  }
}

export default App;
