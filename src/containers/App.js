import React, {Component} from 'react';
import './App.css';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Authorization from "../components/Authorization/Authorization";

import {Route, Switch} from 'react-router';
import {HashRouter} from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <HashRouter>
                    <div className="App__layout">
                        <Switch>
                            <Route path="/auth" component={Authorization}/>
                        </Switch>
                    </div>
                </HashRouter>
                <Footer/>
            </div>
        );
    }
}

export default App;
