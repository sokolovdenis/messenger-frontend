import React, { Component } from 'react';
import ConversationList from './ConversationList/ConversationList'
import MessageList from './MessageList/MessageList';
import SendMessageForm from './SendMessageForm/SendMessageForm';
import './Chat.css';


class Chat extends Component {
	constructor(props) {
        super(props);
    
        this.state = {
            activeChatId: 1,
            messages: [ {id:1, time:'2019', senderId:2, text:'Hello world!'},
                        {id:2, time:'2019', senderId:1, text:'Privet, Yoba!'},
                        {id:3, time:'2019', senderId:2, text:'Allo'},
                        {id:4, time:'2019', senderId:1, text:'Eto ti?'},
                        {id:5, time:'2019', senderId:2, text:'Net, Eby nety'},
                        {id:6, time:'2019', senderId:1, text:'A kto eto?'},
                        {id:7, time:'2019', senderId:2, text:'Ego mama'},
                        {id:8, time:'2019', senderId:1, text:'Pust on vernet dengi'},
                        {id:9, time:'2019', senderId:2, text:'A ti kto?'},
                        {id:10, time:'2019', senderId:2, text:'malchik'},
                        {id:11, time:'2019', senderId:1, text:'I ebal,  mne 9 let'},
                        {id:12, time:'2019', senderId:2, text:'A i zalupa, mne 34'},
                        {id:13, time:'2019', senderId:1, text:'Priyatno poznakomitsy'},
                        {id:14, time:'2019', senderId:2, text:'Za chto Yoba dolgen deneg?'},
                        {id:15, time:'2019', senderId:1, text:'Na penek sel, chirik dolgen'},
                        {id:16, time:'2019', senderId:2, text:'Hahhahaha'},
                        {id:17, time:'2019', senderId:1, text:'Chto smeshnogo?'},
                        {id:18, time:'2019', senderId:2, text:'Ya tebya po IP vychisly'},
                        {id:19, time:'2019', senderId:1, text:'Vo pervych: Ya iz drugovo goroda \n'+
                                                'Vo vtorych: chto ni mne zdelaesh \n'+
                                                'V tretich: za mat izveni'},
                        {id:20, time:'2019', senderId:2, text:'Tobi pizda'},
                        {id:21, time:'2019', senderId:1, text:'Prostite'},
                        {id:22, time:'2019', senderId:2, text:'Ya zvony tvoei mame'},
                        {id:23, time:'2019', senderId:1, text:'Neeeeeeeeet'},
                        {id:24, time:'2019', senderId:2, text:'Zatralil lalku'}],
            chats: [{id:1, name:'Ololo', text:'Zatralil lalku', date:'2019'},
                    {id:2, name:'Mamki', text:'Vot eto prikol', date:'2019'},
                    {id:3, name:'Yoba', text:'Ti gde?', date:'2019'}
                    ],
        };

        this.foo= this.foo.bind(this);
      }
    
      foo() {
      }
    
      render() {
        return (
            <div className="messenger">
                <div className="inbox-people">
                    <div className="headind-srch">
                        <div className="recent-heading">
                            <h4>Recent</h4>
                        </div>
                        <div className="srch-bar">
                            <div className="stylish-input-group">
                                <input type="text" class="search-bar"  placeholder="Search" />
                                <span className="input-group-addon">
                                    <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                                </span> 
                            </div>
                        </div>
                    </div>
                    <ConversationList
                        chats={this.state.chats}/>
                </div>
                <div className="mesgs">
                    <MessageList 
                        activeChatId={this.state.chatId}
                        messages={this.state.messages} />
                    <SendMessageForm
                        sendMessage={this.sendMessage} />
                </div>
            </div>
        );
      }
}


export default Chat