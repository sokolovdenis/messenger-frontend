import React, {Component} from 'react'

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name:"",
            login:"",
            password:"",
            error:""
        };
        
    }
    onNameChange = (e) => {
        this.setState({"name": e.target.value});
    }
    onLoginChange = (e) => {
        this.setState({"login": e.target.value});
    }
    onPasswordChange = (e) => {
        this.setState({"password": e.target.value});
    }
    onSubmit = (e) => {
        e.preventDefault();
            const url = "http://messenger.westeurope.cloudapp.azure.com/api/authentication/signup";
            let content = {
                "name": this.state.name,
                "login": this.state.login,
                "password": this.state.password
            };
            var promise = fetch(
                url, 
                {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify(content)
                }
            )
            promise.then((resp) =>{
                if (resp.ok) {
                    return resp.json();
                } else {
                    var err = new Error(resp.statusText);
                    err.response = resp;
                    throw err
                }
            }).then((json) => {return json.token;})
            .then((token) => this.props.onTokenRecieve(token))
            .catch(err => 
                {
                    if (err.response.status == 409) {
                        this.setState({
                            "error" : "Try another name and login"
                        });
                    } else {
                        this.setState({
                            "error" : "Some error occured, try later"
                        });
                }
                
                }
            )
        }

    render() {
        return (
        <div>
            <div>
                {this.state.error}
            </div>
            <div className="Login" >
                <form onSubmit = {this.onSubmit}>
                    <label className="formtxt">Name</label>
                    <input className = "Field" type="text" value={this.state.name} onChange = {this.onNameChange}/>
                    <br/>
                    <label className="formtxt">Login</label>
                    <input className = "Field" type="text" value={this.state.login} onChange = {this.onLoginChange}/>
                    <br/>
                    <label className="formtxt" >Password</label>
                    <input className = "Field" type="password" value={this.state.password} onChange = {this.onPasswordChange}/>
                    <br/>
                    <input className = "Button" type="submit" value="Submit"/>
                </form>
        
            </div>
        </div>
        )
    }
}

export default SignUp;