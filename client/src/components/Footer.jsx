import React from 'react';
import {Link} from "react-router-dom";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import "./Footer.css";

/* footer valido per tutte le pagine, con a sinistra i link social, in mezzo il logo ed a destra le informazioni di azienda */
const Footer = ()=>{
    return(
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-left">
                    <a href="" target="_blank" rel="noopener noreferrer"><FaFacebookF className="social-icon"/></a>
                    <a href="" target="_blank" rel="noopener noreferrer"><FaInstagram className="social-icon"/></a>
                    <a href="" target="_blank" rel="noopener noreferrer"><FaLinkedinIn className="social-icon"/></a>   
                    <a href="" target="_blank" rel="noopener noreferrer"><FaXTwitter className="social-icon"/></a>

                </div>
                <div className="footer-center">
                    <img className="footer-logo" src="/logo.png" alt="santo-ecommerce-logo" />
                    <h1 className="site-title">Santo's Ecommerce</h1>
                
                </div>

                <div className="footer-right">
                    <p className="piva">P.IVA: 12345678910</p>
                    <Link className="privacy-policy" to="/privacy-policy">Privacy Policy</Link>
                </div>


            </div>
        </footer>
    );
    
}
export default Footer;