import React from 'react';
import './Footer.css';

const Footer = () => (
    <footer className="Footer">
        <span className="Footer__link">
            <a
                href="https://github.com/eshlykov/abbyy-frontend-course-2019"
                target="_blank"
                rel="noopener noreferrer"
            >
                Source on GitHub
            </a>
            <i className="fa fa-external-link" aria-hidden="true"/>
        </span>
    </footer>
);

export default Footer;
