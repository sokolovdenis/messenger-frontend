import React, {Component} from 'react';
import './App.css';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Authorization from "../components/Authorization/Authorization";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <div className="App__layout">
                    <Authorization>
                    </Authorization>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
