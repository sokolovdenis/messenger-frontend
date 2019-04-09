import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router';
import {HashRouter} from 'react-router-dom';

import './App.css';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Authorization from "../pages/Authorization/Authorization";
import Conversations from '../pages/Conversations/Conversations';
import pages from '../constants/pages'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <HashRouter>
                    <div className="App__layout">
                        <Switch>
                            <Route path={pages.authentication} component={Authorization}/>
                            <Route path={pages.conversations} component={Conversations}/>
                            <Redirect from="/" to={pages.conversations}/>
                        </Switch>
                    </div>
                </HashRouter>
                <Footer/>
            </div>
        );
    }
}

export default App;
