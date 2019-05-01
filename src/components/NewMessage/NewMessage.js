import React, {Component} from 'react';
import './NewMessage.css';
import FormField from "../FormField/FormField";
import FormInput from "../FormInput/FormInput";
import Form from "../Form/Form";
import Button from "../Button/Button";
import {connect} from "react-redux";
import {onSendMessageAction} from "../../middlewares/onSendMessage";
import api from '../../constants/api';
import PropTypes from 'prop-types';

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

    render () {
        const errorMessage = this.props.error
            ? <div className="errorMessage">{this.props.error}</div>
            : null;

        return (
          <div className="NewMessage">
              {errorMessage}
              <Form onSubmit={this.handleSubmit.bind(this)}>
                  <FormField label="Сообщение" name="message">
                      <FormInput value={this.state.message} name="message" onChange={this.handleInputChange.bind(this)} />
                  </FormField>
                  <Button type="submit">
                      Отправить
                  </Button>
              </Form>
          </div>
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
