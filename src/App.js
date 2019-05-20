import React from 'react';
// import logo from './logo.svg';
import './App.css';
import AuthComponent from './auth';
import RegisterComponent from './register';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import logo from './messages.png';
import MainComponent from "./main";
import AboutComponent from "./about";


function App() {
  return (
    <div className="App">
      <div id="working-area">
        <div id='header'><div className='title' id='title'>Messenger App</div><img className='title' src={logo} alt='logo'/></div>
          <BrowserRouter>
              <Switch>
                  <Route exact path="/" component={AuthComponent} />
                  <Route path="/register" component={RegisterComponent} />
                  <Route path="/main" component={MainComponent} />
                  <Route path="/about" component={AboutComponent}/>
              </Switch>
          </BrowserRouter>
        {/*<AuthComponent/>*/}
      </div>
    </div>
  );
}

export default App;
