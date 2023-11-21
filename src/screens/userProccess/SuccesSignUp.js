import React from 'react'
import { Link } from "react-router-dom";
import logo from "../../assets/images/global/logoNav.png"
import "./SuccesSignUp.scss"

const SuccesSignUp = () => {
  return (
    <div className='success-container'>
      <div className='header'>
        <Link to="/"><img src={logo} alt='' className='logo'></img></Link>
      </div>

      <div className='summary'>
        <div className='card-summary'>
          <div className='w-image'>
              <p>¡Bienvenid@ a la familia Cogintiv!</p>
              <p>Tu cuenta ha sido creada con éxito</p>
              <p>Recuerda que debes activar tu cuenta mediante el correo eletrónico que hemos enviado a la dirección de email que proporcionaste</p>
              <p>Debes esperar a que un administrador active tu subscripción para iniciar a entrenar con Cognitiv</p>
              <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/480px-Sign-check-icon.png' className='succes-image' alt='wImage'></img>
          </div>
          <Link to="/" className='button'>
            Ir a la página principal
          </Link>
        </div>
      </div>


    </div>
  )
}

export default SuccesSignUp
