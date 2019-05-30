import React, {Component} from 'react';

import './InputBox.css';


class InputBox extends Component {
    render() {
        return (
            <div className='InputBox-container'>
                <input className='InputBox' placeholder="Your message..." onChange={this.props.onMessageChange} value={this.props.value} />
            </div>
        );
    }
}

export default InputBox;