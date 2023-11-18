import React from 'react';
import './Footer.scss';
import logo from "../../assets/images/global/logoNav.png"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className='logo-back'>
                <img src={logo} alt='' className='logo'></img>
            </div>
          </div>

          <div className="footer-section">
            <div className='social-media'>
                <ul className='social'>
                    <li><a href='#'> <FacebookIcon className='ico' /> </a></li>
                    <li><a href='#'> <InstagramIcon className='ico' /> </a></li>
                    <li><a href='#'> <TwitterIcon className='ico' /> </a></li>
                </ul>
            </div>

            <div className='privacy-link'>
                <Link to="/privacypolicy" target='_blank'>
                  Política de términos y privacidad
                </Link>
            </div>
          </div>

          <div className="footer-section">
            <p style={{fontWeight:'lighter'}}> 
                Contacto físico: <br/>
                Universidad Autónoma de Manizales <br/>
                Antigua estación del ferrocarril  <br/>
                Edificio  Sacatín                   <br/>
                Coordinación Ingeniería de Sistemas <br/>
                Telefono:8727272 
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
