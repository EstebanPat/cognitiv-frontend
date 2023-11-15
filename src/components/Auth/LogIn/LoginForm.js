import React, { useState } from 'react'
import { Auth } from '../../../api/index';
import userIcon from "../../../assets/icons/LoginIcons/person.png"
import passIcon from "../../../assets/icons/LoginIcons/password.png"
import { Link } from "react-router-dom";
import "./LoginForm.scss"
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const auth = new Auth();
  const navigate = useNavigate()
  const [userDocument, setUserDocument] = useState("");
  const [userPass, setUserPass] = useState("");
  const [errorDoc, setErrorDoc] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [backError, setBackError] = useState("");

  function errorHandle(){
    if(userDocument.length === 0){
      setErrorDoc("El campo de documento no puede estar vacío")
    }else{
      setErrorDoc("")
      setBackError("")
    }

    if(userPass.length === 0){
      setErrorPass("El campo de contraseña no puede estar vacío")
    }else{
      setBackError("")
      setErrorPass("")
    }
  }

  const handleSetDocument = (event) => {
    setUserDocument(event.target.value)
  }

  const handleSetPass = (event) => {
    setUserPass(event.target.value)
  }

  const handleSave = async () => {
    errorHandle();
    if (errorDoc.length === 0 && errorPass.length === 0) {
      if (userDocument.trim() === "" || userPass.trim() === "") {
        setErrorDoc("El campo de documento no puede estar vacío");
        setErrorPass("El campo de contraseña no puede estar vacío");
      } else {
        const data = {
          identification: userDocument,
          password: userPass,
        }
        
        try {
          const response = await auth.login(data);
          navigate('home')
        } catch (error) {
          if (error.message !== "Unexpected end of input") {
            setBackError(error);
          }
        }
      }
    }
  }  

  return (
    <div className='main-container-login'>
      <div className='header'>
        <p>Ingresar</p>
      </div>

      <form className='form'>
        <div className={`input ${errorDoc.length !== 0 ? 'error' : ''}`}>
          <img src={userIcon} alt=''></img>
          <input 
            type="text" 
            id="document" 
            name="document" 
            className='text-input' 
            placeholder='Documento'
            onChange={handleSetDocument}
          >
          </input>
        </div>
        {errorDoc && <p className="error-message">{errorDoc}</p>}

        <div className={`input ${errorPass.length !== 0 ? 'error' : ''}`}>
          <img src={passIcon} alt=''></img>
          <input 
            type="password" 
            id="password" 
            name="password" 
            className='text-input' 
            placeholder='Contraseña'
            onChange={handleSetPass}
          >
          </input>
        </div>
        {errorPass && <p className="error-message">{errorPass}</p>}
        {backError && <p className="error-message">{backError.message}</p>}
      </form>

      <div className='forgot-pass'>
        <p>¿Olvidaste la contraseña? <a href='#'>¡Da click aquí!</a></p>
      </div>

      <div className='button-container'>
        <a></a>
        <a className='button' onClick={handleSave}>Iniciar sesión</a>
        <Link to="/signup" className='button'>
          Registrarse
        </Link>
      </div>
    </div>
  )
}

export default LoginForm
