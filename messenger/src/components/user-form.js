import React,{Component} from 'react'
import classNames from 'classnames'


export default class UserForm extends Component{

	constructor(props){
		super(props);
		this.state = {
			message: null,
			isLogin: true,
			user: {
				name: '',
				login: '',
				password: '',
			}
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onTextFieldChange = this.onTextFieldChange.bind(this)
		this.onClickOutside = this.onClickOutside.bind(this);
	}

	onClickOutside(event){
		if(this.ref && !this.ref.contains(event.target)){
			if(this.props.onClose){
				this.props.onClose();
			}
		}
	}

	componentDidMount(){
		window.addEventListener('mousedown', this.onClickOutside);
	}
	componentWillUnmount(){
		window.removeEventListener('mousedown', this.onClickOutside);
	}
	onSubmit(event){
		const {user} = this.state;
		const {store} = this.props;
		event.preventDefault();
		this.setState({
			message: null,
		}, () => {
			if(this.state.isLogin){
				if(this.state.user.login === '' && this.state.user.password === ''){
					return;
				}
				store.signIn(user.login, user.password).then((user) => {
					if(this.props.onClose){
						this.props.onClose();
					}
					this.setState({
						message: null,
					});

				}).catch((err) => {
					console.log("err", err);
					this.setState({
						message: {
							body: 'Wrong login or password.',
							type: 'error',
						}
					})
					console.log(this.state.message);
				});
			} else {
				if(this.state.user.login === '' && this.state.user.password === '' && this.state.user.name === ''){
					return;
				}
				store.signUp(user.name, user.login, user.password).then(()=> {
					this.setState({
						message: {
							body: 'User created.',
							type: 'success'
						}
					}, () => {
						store.signIn(user.login, user.password).then(() => {
							if (this.props.onClose) {
								this.props.onClose();
							}
						})
					})
				})
			}

		})
	
		

	}
	onTextFieldChange(event) {

		let {user} = this.state;
		const field = event.target.name;
		user[field] = event.target.value;
		this.setState({
			user: user
		});


	
	}

	render(){
		const {user, message, isLogin} = this.state;
		return (
			<div className="user-form" ref={(ref) => this.ref = ref}>
				<form onSubmit={this.onSubmit} method="post">
					{message ? <p className={classNames('app-message', message.type)}>{message.body}</p>: null}

					{!isLogin ?  <div className="form-item">
						<label>Name</label>
						<input placeholder={'Full name'} onChange={this.onTextFieldChange} type={'text'} value={user.name} name={"name"} />
					</div> : null }

					<div className="form-item">
						<label>Login</label>
						<input value={user.login} onChange={this.onTextFieldChange} type="login" placeholder="Login." name="login" />
					</div>

					<div className="form-item">
						<label>Password</label>
						<input value={user.password} onChange={this.onTextFieldChange} type="password" placeholder="Password" name="password" />
					</div>

					<div className="form-actions">
						{isLogin ? <button onClick={() => {
							this.setState({
								isLogin: false,
							})

						}} type="button">Create an account?
						</button> : null}

						<button className="primary" type="submit">{isLogin ? 'Sign In' : 'Create new account'}</button>
					</div>
				</form>
			</div>

		);
	}
}