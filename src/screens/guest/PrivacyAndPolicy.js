import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/global/logoNav.png'
import uam from '../../assets/images/global/logoUAM.png'
import Footer from "../../components/Surfaces/Footer";
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import "./PrivacyAndPolicy.scss"

const PrivacyAndPolicy = () => {
    const pdfUrl = 'https://www.autonoma.edu.co/sites/default/files/2022-08/Politica-tratamiento-de-datos-personales.pdf';

    return (
        <div className='privacy-main'>
            <div className='header'>
                <Link to="/"><img src={logo} alt='' className='logo'></img></Link>
            </div>
            <div className='privacy'>
                <div className='back'>
                    <Link to="/" className='button'>
                        <WestOutlinedIcon></WestOutlinedIcon>
                        Volver
                    </Link>
                </div>
                <div className='logos'>
                    <img src={logo} alt='cognitiv'></img>
                    <img src={uam} alt='UAM'></img>
                </div>

                <div className='privacy-text'>
                    <iframe title="privacy-policy" src={pdfUrl} className='file' />
                </div>

                
            </div>
            <div className='footer'>
                <Footer></Footer>
            </div>
        </div>
        
    )
}

export default PrivacyAndPolicy
