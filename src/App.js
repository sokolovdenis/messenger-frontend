import React from 'react';
import MainPanel from './MainPanel'
import Header from './Header/index';
import Footer from './Footer/index';
import { HttpRequestUserInfo } from './HttpRequest'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            token: localStorage.getItem("token"),
            tokenExpires: localStorage.getItem("expires"),
            userName: '',
            userId: ''
        }

        this.updateToken = this.updateToken.bind(this);
        this.singOut = this.singOut.bind(this);

    }

    componentDidMount() 
    {
        /* если токен кончился, отправляем на логин */
        let tokenExpiresdate = new Date(this.state.tokenExpires);
        if (tokenExpiresdate < new Date()) {
            localStorage.removeItem("token");
            localStorage.removeItem("expires");
            this.setState({ token: null, tokenExpires: null, userID: '', userName: '' })
        
        }
        if(this.state.token)
            this.loadUserInfo(this.state.token, 'me');
    }

    updateToken(token, tokenExpires){

        localStorage.setItem("token", token);
        localStorage.setItem("expires", tokenExpires);
        this.loadUserInfo(token, 'me');

        this.setState({
            token: token
            , tokenExpires: tokenExpires
        });
    }

    loadUserInfo(token, id) {
        HttpRequestUserInfo(id, token)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    throw response;
                }
            })
            .then((data) => {
                console.log('my id: '+ data.id)
                this.setState({
                    userName: data.name
                    , userId: data.id
                });
            })
            .catch((error) => {
                if (error.statusText === undefined) {
                    console.log(error);
                    alert('При получении данных о пользователе произошла ошибка!');
                } else {
                    console.log(error);
                    alert('При получении данных о пользователе произошла ошибка!');
                }

            });
    }

    singOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("expires");
        this.setState({ token: null, tokenExpires: null, userID: '', userName: '' })
    }

    render() {

        return (<>
            <Header token={this.state.token}
                userName={this.state.userName}
                singOut={this.singOut}
            />
            <MainPanel updateToken={this.updateToken} 
            token={this.state.token} 
            thisUserId = {this.state.userId}/>
            <Footer />
        </>
        );
    }
}

export default App;
