import React, {Component} from 'react';
import './NewMessage.css';
import FormField from "../FormField/FormField";
import FormInput from "../FormInput/FormInput";
import {connect} from "react-redux";
import {onSendMessageAction} from "../../middlewares/onSendMessage";
import api from '../../constants/api';
import PropTypes from 'prop-types';
import SignOut from "../SignOut/SignOut";

class NewMessage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.sendMessage({
            request: api.sendMessagesTo,
            conversationId: this.props.conversationId,
            path: null,
            token: this.props.token,
            content: this.state.message,
        });

        this.setState({
            message: '',
        });
    }

    handleInputChange(event) {
        this.setState({
            message: event.target.value
        });
    }

    render() {

        const errorMessage = this.props.error
            ? (<div className="row">
                <div className="col">
                    <div className="alert alert-danger" role="alert">{this.props.error}</div>
                </div>
            </div>)
            : null;

        return (
            <form className="container px-5 pt-3" onSubmit={this.handleSubmit.bind(this)}>
                {errorMessage}
                <div className="row">
                    <div className="col-auto">
                        <button className="btn btn-primary" type="submit">
                            Send
                        </button>
                    </div>
                    <div className="col">
                        <FormField name="message">
                            <FormInput
                                name="message"
                                value={this.state.message}
                                onChange={this.handleInputChange.bind(this)}
                            />
                        </FormField>
                    </div>
                    <div className="col-auto">
                        <SignOut/>
                    </div>
                </div>
            </form>
        );
    }
}

NewMessage.propTypes = {
    error: PropTypes.string,
};

NewMessage.defaultProps = {
    conversationId: "public",
};

const mapStateToProps = state => ({
    token: state.auth.token,
    conversationId: state.recvMessageList.conversationId,
    error: state.sendMessage.error,
});

const mapDispatchToProps = dispatch => ({
    sendMessage: payload => dispatch(onSendMessageAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);
