import React from 'react';
import { HttpRequestUserInfo } from '../../../HttpRequest'

class Message extends React.Component {
  constructor(props) {
    super(props)
    this.formatDate = this.formatDate.bind(this);
    this.onClickHandle = this.onClickHandle.bind(this);
  }



  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      hour = d.getHours(),
      minute = d.getMinutes(),
      second = d.getSeconds();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [hour, minute, second].join(':') + ' ' + [year, month, day].join('-');
  }

  messageStyle(myMessage) {
    var r =
    {
      'flex-direction': 'row-reverse',
    };
    if (myMessage) {
      return r;
    }
    else return '';
  }
  onClickHandle() {
    this.props.newConversation(this.props.userId);
  }

  render() {
    const dateTimeMessage = this.formatDate(this.props.timestamp);
    /* Хочу получить полу цвет из гуида пользователя */
    const backgroundColor =
      /* Весёлая версия =) */
      String(this.props.userId).substring(0, 6);
    /* Чб версия =) */
    /*'9'+    String(this.props.userId).substring(0, 1)
    +'9'+    String(this.props.userId).substring(2, 1)
    +'9'+    String(this.props.userId).substring(4, 1)*/

    const myDivStyle = {
      'borderColor': '#' + backgroundColor,
      'background': '#' + backgroundColor,
    }
    /* мои сообщение будут справа */
    if (this.props.myMessage) {
      return (
        <>
          <div className="messageTimestampMy">
            {this.props.userName} ({dateTimeMessage})
        </div>
          <div className="messageMy" id={this.props.id}>
            <div className="messageTextMy" style={myDivStyle}>
              {this.props.content}
            </div>
          </div>
        </>
      );
    }
    else {
      return (
        <>
          <div className="messageTimestamp">
            <button type="button" className="link-button"
              onClick={this.onClickHandle}>
              {this.props.userName} ({dateTimeMessage})
            </button>

          </div>
          <div className="message" id={this.props.id}>
            <div className="messageText" style={myDivStyle}>
              {this.props.content}
            </div>
          </div>
        </>
      );
    }
  }

}
export default Message;