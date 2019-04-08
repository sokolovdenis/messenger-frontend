import React, {Component} from 'react';
import './FormField.css';

class FormField extends Component {
    static defaultProps = {};

    render() {
        const {children, label, name} = this.props;

        return (
            <div className="FormField">
                {label ? <label className='FormField__label' htmlFor={name}>{label}</label> : null}
                <span className='FormField__content'>
                    {children}
                </span>
            </div>
        )
    }
};

export default FormField;
