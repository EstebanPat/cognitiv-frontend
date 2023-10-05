import React from 'react'
import SignUp from '../components/Auth/SignUp/SignUp'
import "./RegisterView.scss"

const RegisterView = () => {
  return (
    <div className='register-container'>
      <div className='form-container'>
          <SignUp></SignUp>
      </div>
    </div>
  )
}

export default RegisterView
