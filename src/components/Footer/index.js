import React from 'react';
import {Image} from 'react-bootstrap'
import hearth from './img/hearth.png'
import "./css/index.css"

const Footer = ({message}) =>
    (<p className="text-center footer">
        Created with <Image className="footer-heart" src={hearth} alt="heart"/> by
        <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/daniele-salvatore-5b342452/">Daniele
            Salvatore </a></p>);

export default Footer;

