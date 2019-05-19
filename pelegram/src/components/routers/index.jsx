import React from 'react';
import {Route, Switch, withRouter} from "react-router";
import {LogIn, Register} from '../logPage/index.jsx';
import {Chat} from '../chat/index.jsx';

const MainRouter = () => (
  <Switch>
      <Route exact path='/' component={LogIn}/>
      <Route path='/register' component={Register}/>
      <Route path='/chat' component={Chat}/>
  </Switch>
);

export default withRouter(MainRouter);