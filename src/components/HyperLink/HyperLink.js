import React from 'react';
import './HyperLink.css';
import 'font-awesome/css/font-awesome.min.css'

const HyperLink = ({ link, text, isExternal }) => {
    const externalIcon = isExternal ? <i className="fa fa-external-link" aria-hidden="true"/> : null;

    return (
        <span className="Hyperlink">
            <a href={link} target="_blank" rel="noopener noreferrer">{text}</a>
            {externalIcon}
        </span>
    );
};

export default HyperLink;
