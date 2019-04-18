import React from 'react';
import Signin from './Signin'
import Signup from './Signup'
import MessengerPage from '../MessengerPage/index'

class MainPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginFortSignin: true,
        }
        this.updateToken = this.updateToken.bind(this);
    }

    updateToken(token, tokenExpires) {
        this.props.updateToken(token, tokenExpires);
    }

    handleClick() {
        this.setState({ loginFortSignin: !this.state.loginFortSignin })
    }

    render() {
        if (this.props.token) {
            return (<MessengerPage token={this.props.token} thisUserId={this.props.thisUserId} />)

        }
        else {
            if (this.state.loginFortSignin) {

                return (
                    <div className="login-logup">
                        <Signin onClick={() => this.handleClick()} updateToken={this.updateToken} />
                    </div>
                );
            }
            else {
                return (
                    <div className="login-logup">
                        <Signup onClick={() => this.handleClick()} updateToken={this.updateToken} />
                    </div>);
            }
        }
    }
}
export default MainPanel;