import React, {Component} from 'react'

export default class SearchUser extends Component{

	constructor(props){
		super(props);
		this.handleOnClick = this.handleOnClick.bind(this);
		this.onClickOutside = this.onClickOutside.bind(this);
	}

	handleOnClick(user){
		if(this.props.onSelect){
			this.props.onSelect(user);
		}
	}
	onClickOutside(event){
		console.log("Outside");
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

	render(){
		const {store} = this.props;
		const users = store.getSearchUsers();
		return <div className="search-user" ref={(ref) => this.ref = ref}>
			<div className="user-list">
			{users.map((user, index) => {
				return (<div onClick={() => this.handleOnClick(user)} key={index} className="user">
					<img src={user.avatar} alt="..." />
					<h2>{user.name}</h2>
				</div>)

			})}
			</div>
		</div>
	}
}