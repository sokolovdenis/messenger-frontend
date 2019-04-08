import React, {Component} from 'react';
import './Form.css';

class Form extends Component {
    render() {
        const {children, onSubmit} = this.props;

        return (
            <form
                className='Form'
                onSubmit={onSubmit}
            >
                {children}
            </form>
        )
    }
}

export default Form;
