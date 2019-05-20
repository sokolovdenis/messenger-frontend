import React,{Component} from 'react'
import avatar from '../images/unknownPerson.png'
import UserForm from './user-form'
import UserMenu from './user-menu'


export default class UserBar extends Component{

	constructor(props){
		super(props);
		this.state = {
			showUserForm: false,
			showUserMenu: false,
		}
	}

	render(){

		const {store} = this.props;

		const me = store.getCurrentUser();
		let profilePicture = avatar;
		if(me){
			profilePicture = me.avatar;
		}


		return (
			<div className="user-bar">
				{!me ? <button onClick={() => {

					this.setState({
						showUserForm: true,
					})

				}} type="button" className="login-btn">Sign In</button> : null}
				<div className="profile-name">{me ? me.name : null}</div>
				<div className="profile-image" onClick={() => {

					this.setState({
						showUserMenu: true,
					})

				}}><img src={profilePicture} alt="" /></div>
				
				{!me && this.state.showUserForm ? <UserForm onClose={(msg) => {
					this.setState({
						showUserForm: false,
					})
				}} store={store} /> : null }


				{this.state.showUserMenu ? <UserMenu 
					store={store}
					onClose={() => {

						this.setState({
							showUserMenu: false,
						})
					}}

				/> : null }

			</div>
			);
	}
}