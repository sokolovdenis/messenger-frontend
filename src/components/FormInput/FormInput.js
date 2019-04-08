import React, {Component} from 'react';
import './FormInput.css'

class FormInput extends Component {
    render() {
        const {value, onChange, placeholder, name} = this.props;

        return (
            <input
                type='text'
                className='FormText'
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        )
    }
}

export default FormInput;
