import React from 'react';

class ContactItem extends React.Component {
    constructor(props) {
        super(props);

        this.formatDate = this.formatDate.bind(this);
        this.onClickHandle = this.onClickHandle.bind(this);
    }


    formatDate(date) {
        if (!date) return '';
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

    onClickHandle() {
        this.props.newConversation(this.props.userId)
    }

    render() {
        if (this.props.userId) {
            return (
                <div>
                    <div className="contactItem" >
                        <button type="button" className="link-button-contact" onClick={this.onClickHandle}>
                            <div className="contactItem-Name">{this.props.userName}</div>
                        </button> <div className="contactItem-LastContent">{this.props.content.substring(0, 20)}{this.props.content.length > 20 ? '...' : ''}</div>
                        <div className="contactItem-timestamp">{this.formatDate(this.props.timestamp)}</div>
                    </div>

                </div>
            );
        }
        else {
            return (
                <div>

                    <div className="contactItem-public" /*style={myDivStyle}*/>
                        <button type="button" className="link-button-contact" onClick={this.onClickHandle}>
                            <div className="contactItem-Name">Публичный чат</div>
                        </button >
                        <div className="contactItem-LastContent">{this.props.content.substring(0, 20)}{this.props.content.length > 20 ? '...' : ''}</div>
                        <div className="contactItem-timestamp">{this.formatDate(this.props.timestamp)}</div>
                    </div>

                </div>
            );
        }
    }
}

export default ContactItem;