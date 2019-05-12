import React, {Component} from 'react'
import classNames from 'classnames'
import dog from '../images/dog.jpg'

export default class Messenger extends Component{
	constructor(props){
		super(props);
		this.state={
			height: window.innerHeight,
			messages:[],
		}
		this._onResize = this._onResize.bind(this);
		this.addTestMessages = this.addTestMessages.bind(this);
	}
	_onResize(){
		this.setState({
			height: window.innerHeight,
		});
	}
	componentDidMount(){
		window.addEventListener('resize', this._onResize);

		this.addTestMessages();
	}
	addTestMessages(){
		let {messages} = this.state;

		for(let i=0; i<100; i++){
			let isMe = false;
			if (i % 3 === 0){
				isMe = true;
			}
			const newMsg = {
				author: `Author: ${i}`,
				body: `Body message ${i}`,
				avatar: dog,
				me: isMe,
			}

			messages.push(newMsg);
		}
		this.setState({messages: messages});
	}
	componentWillUnmount(){
		window.removeEventListener('resize', this._onResize);
	}
	render(){
		const {height, messages} = this.state;
		const style={
			height: height,
		}
		return (
			<div style={style} className="app-messenger">
				<div className="header">
					<div className="left">
						<div className="actions">
							<button>New message</button>
						</div>
					</div>
					<div className="content"><h2>Content</h2></div>
					<div className="right">
						<div className="user-bar">
							<div className="profile-name">Kirill Shulga</div>
							<div className="profile-image"><img src={dog} alt="" /></div>
						</div>
					</div>
				</div>
				<div className="main">
					<div className="sidebar-left">
						<div className="channels">
							<div className="channel">
								<div className="channel-image">
									<img src={dog} alt="" />
								</div>
								<div className="channel-info">
									<h2>Kirill, Iliya</h2>
									<p>Hello there...</p>
								</div>
							</div>

							<div className="channel">
								<div className="channel-image">
									<img src={dog} alt="" />
								</div>
								<div className="channel-info">
									<h2>Kirill, Iliya</h2>
									<p>Hello there...</p>
								</div>
							</div>

							<div className="channel">
								<div className="channel-image">
									<img src={dog} alt="" />
								</div>
								<div className="channel-info">
									<h2>Kirill, Iliya</h2>
									<p>Hello there...</p>
								</div>
							</div>
						</div>
					</div>
					<div className="content">
						<div className="messages">
							{messages.map((message, index) =>{
								return (
									<div key={index} className={classNames('message', {'me': message.me})}>
										<div className="message-user-image"><img src={message.avatar} alt="" /></div>
										<div className="message-body">
											<div className="message-author">{message.me ? 'You ' : message.author} say:</div>
											<div className="message-text">
												<p>
												{message.body}
												</p>
											</div>
										</div>
									</div>
								)
							})}
						</div>

						<div className="messenger-input">
							<div className="text-input">
								<textarea placeholder="Write message..." />
							</div>
							<div className="actions">
								<button className="send">Send</button>
							</div>
						</div>
					</div>
					<div className="sidebar-right">
						<div className="members">
							<h2 className="title">Members</h2>
							<div className="member">
								<div className="member-image">
									<img src={dog} alt="" />
								</div>
								<div className="member-info">
									<h2>Kirill Shulga</h2>
									<p>Joined: 3 day ago.</p>
								</div>
							</div>

							<div className="member">
								<div className="member-image">
									<img src={dog} alt="" />
								</div>
								<div className="member-info">
									<h2>Kirill Shulga</h2>
									<p>Joined: 3 day ago.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}