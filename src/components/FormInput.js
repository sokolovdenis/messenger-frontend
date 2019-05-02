import React, {Component} from 'react';

class FormInput extends Component {
    render() {
        const {value, onChange, placeholder, name, type} = this.props;

        return (
            <input
                type={type ? type : 'text'}
                className='form-control'
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        )
    }
}

export default FormInput;
