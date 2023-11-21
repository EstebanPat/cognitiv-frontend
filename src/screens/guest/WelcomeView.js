import React, {useEffect} from 'react'
import "./WelcomeView.scss"
import LoginForm from '../../components/Auth/LogIn/LoginForm'
import image1 from "../../assets/images/home/welcome.png"
import NavBar from '../../components/Surfaces/NavBar'
import WhoWeAre from "./WhoWeAre";
import Footer from "../../components/Surfaces/Footer";
import Team from './Team'
import { Auth } from '../../api/auth';
import { useNavigate } from 'react-router-dom';


const WelcomeView = () => {
  const auth = new Auth();
  const navigate = useNavigate();

  useEffect(() => {
    if(auth.getAccessToken() !== null){
      navigate("/home");
    }
  }, [])
  
  return (
    <div className='main'>
      <div className='nav-container'>
        <NavBar showOptions={true}/>
      </div>

      <div className='log-container' id='login'>
        <div className='image-container'>
          <img src={image1} className='main-image' alt='welcomeImage'></img>
        </div>
        <div className='login'>
          <LoginForm/>
        </div>
      </div> 

      <div className='about-container' id='aboutUs'>
        <WhoWeAre></WhoWeAre>
      </div>

      <div className='team-container' id='team'>
        <Team></Team>
      </div>

      <div className='footer'>
        <Footer></Footer>
      </div>
      
    </div>
  )
}

export default WelcomeView
