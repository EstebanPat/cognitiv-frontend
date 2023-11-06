import React from 'react'
import "./WelcomeView.scss"
import LoginForm from '../../components/Auth/LogIn/LoginForm'
import image1 from "../../assets/images/home/welcome.png"
import NavBar from '../../components/Surfaces/NavBar'
import WhoWeAre from "./WhoWeAre";


const WelcomeView = () => {
  return (
    <div className='main'>
      <div className='nav-container'>
        <NavBar/>
      </div>

      <div className='log-container'>
        <div className='image-container'>
          <img src={image1} className='main-image' alt='welcomeImage'></img>
        </div>
        <div className='login'>
          <LoginForm/>
        </div>
      </div> 

      <div className='about-container'>
        <WhoWeAre></WhoWeAre>
      </div>
      
    </div>
  )
}

export default WelcomeView
