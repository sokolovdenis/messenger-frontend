import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import Login from "./Login";
import Register from "./Register";

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={Login} />
            <Route exact path="/Register" component={Register} />
        </div>
    </Router>,
    document.getElementById('root')
);
