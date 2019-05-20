import React, {Component} from 'react'
import classNames from 'classnames'
import publicImg from '../images/public.dms'
import unknownPearson from '../images/unknownPerson.png'
import SearchUser from './search-user'
import Websocket from 'react-websocket';
import UserBar from './user-bar'
import TimeAgo from 'react-timeago'

export default class Messenger extends Component{
	constructor(props){
		super(props);
		this.state={
			height: window.innerHeight,
			newMessage: '',
			searchUser: '',
			showSearchUser: false,
			createNewChannel:false,
		};
		this.onResize = this.onResize.bind(this);
		this.handleSend = this.handleSend.bind(this);
		this.renderMessage = this.renderMessage.bind(this);
		this.scrollMessagesToBottom = this.scrollMessagesToBottom.bind(this);
		this.onCreateChannel = this.onCreateChannel.bind(this);
		this.handleIncomingMessage = this.handleIncomingMessage.bind(this);
		this.renderChannelTitle = this.renderChannelTitle.bind(this)
		this.onScroll = this.onScroll.bind(this);
	}
	renderChannelTitle(channel = null){
		if(!channel){
				return null;
			}
		let user = null;
		if (channel.participant){
			user = this.props.store.getUserInfo(channel.participant);
			if(!user){
				user = {
					name: channel.participant,
					avatar: {unknownPearson},
				}
			}
		}
		return <h2>{channel.id === 'public' ? 'Public' : user.name}</h2>
	}
	scrollMessagesToBottom(){
		if(this.messageRef){
			this.messageRef.scrollTop = this.messageRef.scrollHeight;
		}
	}
	onCreateChannel(){
		if(this.props.store.getCurrentUser()) {
			this.setState({
				createNewChannel: true,
			})
		}
	}
	renderMessage(text){
		if(!text){
			return;
		}
		const html = text.split('\n').map((m, key) => {
			return <p key={key} dangerouslySetInnerHTML={{__html: m}} />
		})
		return html;
	}
	handleSend(){
		const {newMessage} = this.state;
		if(newMessage.trim().length){
			const {store} = this.props;
			store.addMessage(newMessage);
			this.setState({
				newMessage: '',
			});
		}
	}
	onScroll(){
		const {store} = this.props;
		store.handleScroll();
	}
	handleIncomingMessage(data){
		const {store} = this.props;
		store.addIncomingMessage(data);
	}
	onResize(){
		this.setState({
			height: window.innerHeight,
		});
	}

	componentDidMount(){
		window.addEventListener('resize', this.onResize);
		//window.addEventListener('scroll', this.onScroll);
	}

	componentWillUnmount(){
		window.removeEventListener('resize', this.onResize);
		//window.removeEventListener('scroll', this.onScroll);
	}
	componentDidUpdate() {
		this.scrollMessagesToBottom();
	}

	render(){
		const {store} = this.props;
		const {height} = this.state;
		const style={
			height: height,
		};

		const activeChannel = store.getActiveChannel();
		const channels = store.getChannels();
		const messages = store.getMessagesFromChannel();

		return (
			<div style={style} className="app-messenger">
				<div className="header">
					<div className="left">
						<div className="actions">
							<button onClick={this.onCreateChannel} className="right-action"><i className="icon-edit-modify-streamline" /></button>
							<h2>Messenger</h2>
						</div>
					</div>
					<div className="content">
						{this.state.createNewChannel ?
							<div className="toolbar">
								<label>To:</label>
								<input placeholder="Type name of person..." onChange={(event) => {
									const searchUserText = event.target.value;
									this.setState({
										searchUser: searchUserText,
										showSearchUser: true,
									}, () => {
										store.startSearchUsers(searchUserText);
									});
								}} type="text" value={this.state.searchUser}/>
								{this.state.showSearchUser ? <SearchUser
									onClose={() => {
										console.log("On close")
										this.setState({
											showSearchUser: false,
											searchUser: '',
											createNewChannel:false,
										})
									}}
									onSelect={(user) => {
										this.setState({
											showSearchUser: false,
											searchUser: '',
											createNewChannel:false,
										}, () => {
											store.startNewChannel(user.id);
										});
									}}
									store={store}/> : null}
							</div> : this.renderChannelTitle(activeChannel)}
						{/*{activeChannel ? <h2>{activeChannel.id === 'public' ? 'Public' : store.getActiveChannelName()}</h2> : null}*/}
					</div>
					<div className="right">
						<div className="user-bar">
							<UserBar store={store} />
						</div>
					</div>
				</div>
				<div className="main">
					<div className="sidebar-left">
						<div className="channels">
							{channels.map((channel, index) =>{
								let channelInfo = store.getUserInfo(channel.participant);
								if(!channelInfo){
									channelInfo = {name:channel.participant, avatar:{unknownPearson}};
								}
								return (
									<div onClick={() => {
										store.setActiveChannelId(channel.id);
									}} key={index} className={classNames('channel', {'active': activeChannel.id === channel.id})}>
										<div className="channel-image">
											{channel.id === 'public' ? <img src={publicImg} alt="" /> : <img src={channelInfo.avatar} alt="" />}
										</div>
										<div className="channel-info">
											<h2>{channel.id === 'public' ? 'Public' : channelInfo.name}</h2>
											<div className="time"><TimeAgo date={channel.lastMessage.timestamp}/></div>
											<div className="bottom">
												<div className={classNames('author', {'me': channel.lastMessage.me})}>{channel.lastMessage.me ? 'You: ': null}</div>
												{channel.lastMessage.content ?
													<p>{channel.lastMessage.content.length < 30 ? channel.lastMessage.content : channel.lastMessage.content.substring(0, 30)+'...'}</p>
													: ''}
											</div>
										</div>
									</div>
								)
							})}
						</div>
					</div>
					<div className="content">
						<div ref={(ref) => this.messageRef = ref} onScroll={this.onScroll} className="messages">
							{messages.map((message, index) =>{
								let user = store.getUserInfo(message.user);
								if(!user){
									user = {name:message.user, avatar:{unknownPearson}};
								}
								return (
									<div key={index} className={classNames('message', {'me': message.me})}>
										<div className="message-body">
											<div className="message-user-image"><img src={user.avatar} alt="" /></div>
											<div className="message-another-body">
												<div className="time"><TimeAgo date={message.timestamp}/></div>
												<div className="message-author">{message.me ? `You say` : `${user.name} says`}:</div>
												<div className="message-text">
													{this.renderMessage(message.content)}
												</div>
											</div>
										</div>
									</div>
								)
							})}
							{store.user ? <Websocket url={store.getWebSocket()} onMessage={this.handleIncomingMessage}/> : null}
						</div>

						{activeChannel ?
							<div className="messenger-input">
								<div className="text-input">
									<textarea onKeyUp={(event) => {
										if(event.key==='Enter' && !event.shiftKey){
											this.handleSend();
										}
									}} onChange={(event) => {
										this.setState({newMessage: event.target.value});
									}} value={this.state.newMessage} placeholder="Write message..." />
								</div>
								<div className="actions">
									<button onClick={this.handleSend} className="send">Send</button>
								</div>
							</div> : null }
					</div>
					<div className="sidebar-right">
					</div>
				</div>
			</div>
		)
	}
}