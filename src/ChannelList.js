import React, {Component} from 'react';
import './ChannelList.css';

export default class ChannelList extends Component {
    constructor(props) {
        super(props);
        this.getChatNameFromId = props.getChatNameFromId;
        this.getActiveChannel = props.getActiveChannel;
        this.setActiveChannel = props.setActiveChannel;
        this.getChannels = props.getChannels;
    }

    render() {
        return (
            <ul className="channel-list">
            {           
                this.getChannels().map(channel => {
                    if(channel) {
                        if(channel === this.getActiveChannel()) {
                            return (
                                <li key={channel} className="channel">
                                    <p className="channel-name"><b>{this.getChatNameFromId(channel)}</b></p>
                                </li>
                            );
                        } else {
                            return (
                                <li key={channel} className="channel">
                                    <a onClick={()=>this.setActiveChannel(channel)} href="/chat#" className="channel-name">{this.getChatNameFromId(channel)}</a>
                                </li>
                            );
                        }
                    }
                })
            }
            </ul>
        )
    }
}
