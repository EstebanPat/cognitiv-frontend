import React, { useEffect, useState } from 'react';
import logo from "../../assets/images/global/logoNav.png"
import { Auth } from '../../api';
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./ActivateView.scss"

const ActivateView = () => {
    const auth = new Auth()
    const navigate = useNavigate();
    const location = useLocation()

    const searchToken = new URLSearchParams(location.search)
    const token = searchToken.get('token')
    useEffect(() => {
        if (!token) {
          navigate('/');
        }
        auth.activateAccount(token)
        .then((response)=> {
            console.log(response);
        })
        .catch((error) => {
            console.error('Error al activar cuenta', error);
        })
    }, [token, navigate])

    return (
      <div className='main-view'>
          <div className='forgot-form-container'>
              <form className='forgot-form'>
                  <div className='logo-form'>
                      <img src={logo} alt='' className='logo'></img>
                  </div>

                  <p> Activación de cuenta </p>

                  <p style={{textAlign:'center'}}> Su cuenta ha sido activada con éxito, en este momento puede acceder a la plataforma de Cognitiv</p>

                  <div className='send-button'>
                    <Link to="/" className='button'>
                      Continuar
                    </Link>
                  </div>
              </form>
          </div>
      </div>
    )
}

export default ActivateView
