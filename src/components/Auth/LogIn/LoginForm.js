import React, { useState } from 'react'
import userIcon from "../../../assets/icons/LoginIcons/person.png"
import passIcon from "../../../assets/icons/LoginIcons/password.png"
import "./LoginForm.css"

const LoginForm = () => {
  const [userDocument, setUserDocument] = useState("");
  const [userPass, setUserPass] = useState("");

  const handleSetDocument = (event) => {
    setUserDocument(event.target.value)
  }

  const handleSetPass = (event) => {
    setUserPass(event.target.value)
  }

  const handleSave = async () => {
    const data = {
        document: userDocument,
        password: userPass,
    }
    console.log(data);
  }

  return (
    <div className='main-container-login'>
      <div className='header'>
        <p>Ingresar</p>
      </div>

      <form className='form'>
        <div className='input'>
          <img src={userIcon} alt=''></img>
          <input 
            type="number" 
            min={0} 
            id="document" 
            name="document" 
            className='text-input' 
            placeholder='Documento'
            onChange={handleSetDocument}
          >
          </input>
        </div>

        <div className='input'>
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
      </form>

      <div className='forgot-pass'>
        <p>¿Olvidaste la contraseña? <a href='#'>¡Da click aquí!</a></p>
      </div>

      <div className='button-container'>
        <a className='button' onClick={handleSave}>Iniciar sesión</a>
      </div>
    </div>
  )
}

export default LoginForm
