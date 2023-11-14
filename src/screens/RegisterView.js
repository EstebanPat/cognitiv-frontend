import React from 'react'
import SignUp from '../components/Auth/SignUp/SignUp'
import logo from '../assets/images/global/logoNav.png'
import "./RegisterView.scss"
import { Link } from 'react-router-dom'

const RegisterView = () => {
  return (
    <div className='register-container'>
      <div className='header'>
        <Link to="/"><img src={logo} alt='' className='logo'></img></Link>
      </div>
      <div className='form-container'>
          <SignUp></SignUp>
      </div>
    </div>
  )
}

export default RegisterView
