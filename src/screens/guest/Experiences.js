import React from 'react'
import Carousel from '../../components/Surfaces/Carousel'
import video1 from '../../assets/videos/experience_1.mp4'
import video2 from '../../assets/videos/experience_2.mp4'
import video3 from '../../assets/videos/experience_3.mp4'
import video4 from '../../assets/videos/experience_4.mp4'
import video5 from '../../assets/videos/experience_5.mp4'
import video6 from '../../assets/videos/experience_6.mp4'
import "./Experiences.scss"


const Card = ({videoSrc}) => (
  <div className='card'>
    {videoSrc ? (
      <video controls>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    ) : (
      <></>
    )}
  </div>
);

const Experiences = () => {
  return (
    <div className='exp-container'>
      <div className='text-experiences'>
        <p>Conoce algunas experiencias con Cognitiv</p>
      </div>

      <div className='carousel-container'>
        <Carousel>
          <Card key={1} videoSrc={video1} />
          <Card key={2} videoSrc={video2} />
          <Card key={3} videoSrc={video3} />
          <Card key={4} videoSrc={video4} />
          <Card key={5} videoSrc={video5} />
          <Card key={6} videoSrc={video6} />
        </Carousel>
      </div>
    </div>
  )
}

export default Experiences
