import React, { useState } from 'react'
import "./LoginForm.css"
import { Button } from '@mui/material'
import userIcon from "../../../assets/icons/LoginIcons/person.png"
import passIcon from "../../../assets/icons/LoginIcons/password.png"


const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className='container'>
      <div className='header'>
        <p>Ingresar</p>
      </div>

      <form className='form'>
        <div className='input'>
          <img src={userIcon} alt=''></img>
          {/* <label for="document">Documento</label> */}
          <input type="number" min={0} id="document" name="document" className='text-input' placeholder='Documento'></input>
        </div>

        <div className='input'>
          <img src={passIcon} alt=''></img>
          {/* <label for="document">Contraseña</label> */}
          <input type="password" id="password" name="password" className='text-input' placeholder='Contraseña'></input>
        </div>
      </form>

      <div className='forgot-pass'>
        <p>¿Olvidaste la contraseña? <a href='#'>¡Da click aquí!</a></p>
        
      </div>

      <Button variant="outlined">Primary</Button>
    </div>
  )
}

export default LoginForm
