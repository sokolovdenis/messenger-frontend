import React from 'react';
import Hyperlink from '../HyperLink/HyperLink';
import './Footer.css';

const Footer = () => {
    return (
        <div className="Footer">
            <Hyperlink link="https://github.com/eshlykov/abbyy-frontend-course-2019" text="GitHub" isExternal />
        </div>
    );
};

export default Footer;
