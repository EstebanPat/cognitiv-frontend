import React, { useEffect, useState } from "react";
import styled from "styled-components";

const CarouselContainer = styled.div`
  position: absolute;
  display:flex;
  flex-direction:center;
  max-width: 700px; 
  width: 100%;
  height: 450px; 
  overflow: hidden;
`;

const CarouselImg = styled.img`
  display:flex;
  flex-direction:center;
  width: 100%;
  height: auto;
  object-fit: contain;
  opacity: 0;
  transition: 1s;
  &.loaded {
    opacity: 1;
  }
`;

const CarouselButtonContainer = styled.div`
  display: flex;
  align-content: center;
  flex-direction: row;
  margin-top: 15px;
`;

const CarouselButton = styled.button`
  color: white;
  background-color: #eb118a;
  padding: 8px;
  margin: 0 5px;
`;

function Carousel(props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(props.images[0]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (props.autoPlay || !props.showButtons) {
      const interval = setInterval(() => {
        selectNewImage(selectedIndex, props.images);
      }, 5000);
      return () => clearInterval(interval);
    }
  });

  const selectNewImage = (index, images, next = true) => {
    setLoaded(false);
    setTimeout(() => {
      const condition = next ? selectedIndex < images.length - 1 : selectedIndex > 0;
      const nextIndex = next ? (condition ? selectedIndex + 1 : 0) : condition ? selectedIndex - 1 : images.length - 1;
      setSelectedImage(images[nextIndex]);
      setSelectedIndex(nextIndex);
    }, 500);
  };

  const previous = () => {
    selectNewImage(selectedIndex, props.images, false);
  };

  const next = () => {
    selectNewImage(selectedIndex, props.images);
  };

  return (
    <>
        <CarouselContainer>
          <CarouselImg
            src={props.images[selectedIndex]}
            alt="Gentleman"
            className={loaded ? "loaded" : ""}
            onLoad={() => {
              console.log('La imagen se ha cargado correctamente');
              setLoaded(true);
            }}
          />
          <CarouselButtonContainer>
            {props.showButtons ? (
              <>
                <CarouselButton onClick={previous}>{"<"}</CarouselButton>
                <CarouselButton onClick={next}>{">"}</CarouselButton>
              </>
            ) : (
              <></>
            )}
          </CarouselButtonContainer>
        </CarouselContainer>
    </>
  );
}

export default Carousel;
