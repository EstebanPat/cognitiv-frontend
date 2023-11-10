import Prueba1 from "../../assets/videos/Prueba1.mp4";
import Prueba2 from "../../assets/videos/Prueba2.mp4";
import "./Carousel.css";
import React from "react";
import { Carousel } from "react-bootstrap";
import ReactPlayer from "react-player";
import "bootstrap/dist/css/bootstrap.css";

const VideoCarousel = () => {
    const videoProperties = [
        {
            id: 1,
            title: "Video 1",
            src: Prueba1,
        },
        {
            id: 2,
            title: "Video 2",
            src: Prueba2,
        },
    ];

    return (
        <div className="App">
            <Carousel className="carousel">
                {videoProperties.map((videoObj) => {
                    return (
                        <Carousel.Item key={videoObj.id} className="item">
                            <div className="video-container">
                                <ReactPlayer
                                    url={videoObj.src}
                                    pip={true}
                                    style={{flex:1, justifyContent:"center"}}
                                    controls={true}
                                    playing={true}
                                    width="100%"   // Deja que el ancho se ajuste automáticamente
                                    height="500px" // Establece una altura fija para videos verticales
                                />
                            </div>
                        </Carousel.Item>
                    );
                })}
            </Carousel>
        </div>
    );
};

export default VideoCarousel;
