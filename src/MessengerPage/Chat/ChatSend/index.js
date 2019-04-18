import React from 'react';

class ChatSend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }

        this.handleChangeTest = this.handleChangeTest.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeTest(event) {
        this.setState({ text: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        /*Если пусто, то ничего не делаем */
        if (this.state.text){
        this.props.onSubmit(this.state.text);
        this.setState({ text: '' });
        }
    }

    render() {
        return (
            <form className="sendMessagePanel" onSubmit={this.handleSubmit}>
                <input id="password"
                    name="password"
                    placeholder="Введите текст сообщение сюда"
                    className="inputText"
                    value={this.state.text}
                    onChange={this.handleChangeTest} />
                <input id="submitButton" type="submit" value="Отправить"/>
            </form>
        );
    }




}
export default ChatSend;