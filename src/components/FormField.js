import React, {Component} from 'react';

class FormField extends Component {
    render() {
        const {children, label, name} = this.props;

        return (
            <div className="form-group">
                {label
                    ? <label htmlFor={name} className="font-weight-lighter">{label}</label>
                    : null}
                {children}
            </div>
        )
    }
};

export default FormField;
