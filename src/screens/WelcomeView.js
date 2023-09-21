import React from 'react'
import "./WelcomeView.css"
import NavBar from '../components/Surfaces/NavBar'
import Wave from 'react-wavify'


const WelcomeView = () => {
  return (
    <div>
      <header>
        <NavBar/>
      </header>      
      <div className='wave-container'>
        <Wave fill='#13511a'
              paused={false}
              style={{ display: 'flex'}}
              options={{
                height: 0.5,
                amplitude: 50,
                speed: 0.3,
                points: 2
              }}
        />
      </div>
    </div>
  )
}

export default WelcomeView
