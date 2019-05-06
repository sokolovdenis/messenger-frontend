let {HashRouter, Link, Route, NavLink} = ReactRouterDOM;

let Router = HashRouter;
let CSSTransitionGroup = ReactTransitionGroup.CSSTransitionGroup

class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    componentWillUnmount() {
        this.setState({
            email: "",
            password: "",
            name: "",
            hasAgreed: false
        });
    }

    handleChange = e => {
        let target = e.target;
        let value = target.type === "checkbox" ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });

        if (e.target.value && e.target.type !== "checkbox") {
            let label = document.querySelector(`#${e.target.id} ~ label`);
            label.classList.add("label-transition");
        } else if (!e.target.value && e.target.type !== "checkbox") {
            let label = document.querySelector(`#${e.target.id} ~ label`);
            label.classList.remove("label-transition");
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        console.log("Form submitted with", this.state);
    };

    render() {
        return (
            <form
                className="FormFields"
                onSubmit={this.handleSubmit}
                id={this.props.propId}
            >
                <div className="FormField">
                    <i className="fas fa-envelope"/>

                    <div className="Input__group">
                        <input
                            type="email"
                            id="email"
                            className="FormField__Input"
                            name="email"
                            required
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <div className="Input__line"/>
                        <label htmlFor="email" className="FormField__Label">
                            Enter your email
                        </label>
                    </div>
                </div>
                <div className="FormField">
                    <i className="fas fa-lock"/>{" "}
                    <div className="Input__group">
                        <input
                            type="password"
                            id="password"
                            className="FormField__Input"
                            name="password"
                            required
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <div className="Input__line"/>
                        <label htmlFor="password" className="FormField__Label">
                            Enter your password
                        </label>
                    </div>
                </div>

                <div className="FormField">
                    <button className="FormField__Button mr-20">Sign In</button>
                    <Link to="/" className="FormField__Link">
                        Create an account
                    </Link>
                </div>
            </form>
        );
    }
}

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            hasAgreed: false
        };
    }

    componentWillUnmount() {
        this.setState({
            email: "",
            password: "",
            name: "",
            hasAgreed: false
        });
    }

    handleChange = e => {
        let target = e.target;
        let value = target.type === "checkbox" ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
        if (e.target.value && e.target.type !== "checkbox") {
            let label = document.querySelector(`#${e.target.id} ~ label`);
            label.classList.add("label-transition");
        } else if (!e.target.value && e.target.type !== "checkbox") {
            let label = document.querySelector(`#${e.target.id} ~ label`);
            label.classList.remove("label-transition");
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        console.log("Form submitted with", this.state);
    };

    render() {
        return (
            <form
                className="FormFields"
                onSubmit={this.handleSubmit}
                id={this.props.propId}
            >
                <div className="FormField">
                    <i className="fas fa-user"/>
                    <div className="Input__group">
                        <input
                            type="text"
                            id="SignUpName"
                            className="FormField__Input"
                            name="name"
                            required
                            onChange={this.handleChange}
                            minLength="1"
                            value={this.state.name}
                        />
                        <div className="Input__line"/>
                        <label htmlFor="SignUpName" className="FormField__Label">
                            Enter your full name
                        </label>
                    </div>
                </div>
                <div className="FormField">
                    <i className="fas fa-lock"/>
                    <div className="Input__group">
                        <input
                            type="password"
                            id="SignUpPassword"
                            className="FormField__Input"
                            name="password"
                            required
                            onChange={this.handleChange}
                            value={this.state.password}
                        />
                        <label htmlFor="SignUpPassword" className="FormField__Label">
                            Enter your password
                        </label>
                        <div className="Input__line"/>
                    </div>
                </div>
                <div className="FormField">
                    <i className="fas fa-envelope"/>
                    <div className="Input__group">
                        <input
                            type="email"
                            id="SignUpEmail"
                            className="FormField__Input"
                            name="email"
                            required
                            onChange={this.handleChange}
                            value={this.state.email}
                        />
                        <label htmlFor="SignUpEmail" className="FormField__Label">
                            Enter your email
                        </label>
                        <div className="Input__line"/>
                    </div>
                </div>
                <div className="FormField">
                    <label htmlFor="" className="FormField__CheckboxLabel">
                        <input
                            type="checkbox"
                            className="FormField__Checkbox"
                            name="hasAgreed"
                            onChange={this.handleChange}
                            required
                        />
                        I agree to the
                        <a href="#" className="FormField__TermsLink">
                            terms of service
                        </a>
                    </label>
                </div>
                <div className="FormField">
                    <button className="FormField__Button mr-20">Sign Up</button>
                    <Link to="/sign-in" className="FormField__Link">
                        I'm already a member
                    </Link>
                </div>
            </form>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <CSSTransitionGroup
                        in={true}
                        appear={true}
                        timeout={300}
                        classNames="fadein"
                    >
                        <div className="App__Form">
                            <div className="PageArrow">
                                <NavLink to="/sign-in" className="PageArrow__Item">
                                    <i className="fas fa-angle-left"/>
                                </NavLink>
                                <NavLink exact to="/" className="PageArrow__Item">
                                    <i className="fas fa-angle-right"/>
                                </NavLink>
                            </div>
                            <div className="FormTitle">
                                <NavLink to="/sign-in">Sign In</NavLink>
                                or{" "}
                                <NavLink exact to="/">Sign Up</NavLink>
                            </div>

                            <Route exact path="/" component={SignUpForm}/>
                            <Route path="/sign-in" component={SignInForm}/>
                        </div>
                    </CSSTransitionGroup>
                </div>
            </Router>
        );
    }
}


ReactDOM.render(<App/>, document.getElementById('root'));
