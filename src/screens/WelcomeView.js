import React from 'react'
import "./WelcomeView.scss"
import LoginForm from '../components/Auth/LogIn/LoginForm'
import image1 from "../assets/images/home/welcome.png"


const WelcomeView = () => {
  return (
    <div className='main'>
      <div className='main-container'>
        <div className='image-container'>
          <img src={image1} className='main-image'></img>
        </div>
        <div className='login'>
          <LoginForm/>
        </div>
      </div> 
    </div>
  )
}

export default WelcomeView
