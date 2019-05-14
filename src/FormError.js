import React from 'react';
import './FormError.css';

export const FormError = (event) => {
    let hasSubmit = event.hasSubmit;
    let error = event.error;
    if(hasSubmit && error.length > 0) {
        return <div className="form-error">
                {error.split('\n').map((item, i) => {
                    return <p className="error-text" key={i}>{item}</p>;
                })}
                </div>;
    } else {
        return "";
    }
}
        