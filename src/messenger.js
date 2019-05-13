import React, {Component} from 'react';
import MessagesList from "./messages-list";
import "./App.css"
import AllChats from "./all_chats";
import Chat from "./chat";
import { postPrivateMessage, postPublicMessage, getUserByName } from "./api";

class Messenger extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'all_messages',
            user_id: "",
            user_name: "",
            found_user_name: "",
            found_user_id: "",
            found_users: [],
        };
        console.log(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAllChatsClick = this.handleAllChatsClick.bind(this);
        this.handleOnChatClick = this.handleOnChatClick.bind(this);
        this.handleFindUserClick = this.handleFindUserClick.bind(this);
    }

    handleAllChatsClick() {
        this.setState({value: "all_chats"});
    }

    handleFindUserClick(event) {
        event.preventDefault();
        var user_to_find = document.getElementsByName("user_name")[0].value;
        console.log("Try to find user " + user_to_find);
        getUserByName(user_to_find).then(response => {
            console.log(response);
            this.setState({found_user_name: response[0]["name"], found_user_id: response[0]["id"], found_users: response});
        })
    }

    handleOnChatClick(user_id, user_name) {
        if (user_name == null) {
            this.setState({value: "all_messages"});
        } else {
            this.setState({value: "private_chat", user_id: user_id, user_name: user_name});
        }
    }

    handleSubmit(event){
        event.preventDefault();
        let text = document.getElementsByName("message")[0].value;
        console.log(text);
        if (this.state.value == "all_messages"){
            postPublicMessage(text);
        } else {
            postPrivateMessage(this.state.user_id, text);
        }
        document.getElementsByName("message")[0].value = "";
    }

    render() {
        let screen = null;
        if (this.state.value === "all_messages") {
            screen = <MessagesList token={this.props.token}/>;
        } else if (this.state.value === "all_chats") {
            screen = <AllChats token={this.props.token} onChatClick={this.handleOnChatClick} />;
        } else if (this.state.value === "private_chat") {
            screen = <Chat user_id={this.state.user_id} user_name={this.state.user_name} />;
        }
        return (
            <div>
                <div className="Menu">
                    <button onClick={this.handleAllChatsClick}> {"All chats"} </button>
                </div>
                <div className="WholeMessenger">
                    <div className="Messenger_css">
                        {screen}
                    </div>
                    <div className="InputField">
                        <form>
                            <input type='text' name="message" size={79} />
                            <input type='submit' value={"Send"} onClick={this.handleSubmit}/>
                        </form>
                    </div>
                </div>
                <div className="FindUser">
                    <div>
                        <form>
                            <input type='find_user' name="user_name" />
                            <button type='find' onClick={this.handleFindUserClick}>{"Search"}</button>
                        </form>
                    </div>
                    <div>
                        {
                            this.state.found_users.map(user =>
                                <div className="FoundUser" key={user.id} onClick={() => this.handleOnChatClick(user.id, user.name)}>
                                    {user.name}
                                </div>)
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Messenger;