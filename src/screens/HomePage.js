import React , { useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import NavBar from '../components/Surfaces/NavBar'
import Footer from '../components/Surfaces/Footer'
import "./HomePage.scss"

import { Auth } from '../api/auth';

const HomePage = () => {
  const auth = new Auth();
  const navigate = useNavigate();

  useEffect(() => {
    if(auth.getAccessToken() === null){
      navigate("/");
    }
  }, [])

  const handleCardClick = (text) => {
    if(text === "Entrenamiento Fisico"){
      navigate("physicaltrainings")
    }else if(text === "Entrenamiento Cognitivo"){
      navigate("cognitive/game")
    }
  };

  return (
    <div className='home-main'>
      <div className='nav-container'>
        <NavBar showOptions={false}/>
      </div>
      
      <div className='options'>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          className="box"
        >
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} className='grid' justifyContent="center" >
            <Grid item xs={3} className='grid-item'>
              <Card
                className='card'
                onClick={() => handleCardClick("Entrenamiento Fisico")}
              >
                <CardContent className='cardContent'>
                  <Typography
                    variant="h5"
                    component="div"
                    className='cardContent'
                  >
                    Entrenamiento Físico
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={3} className='grid-item'>
              <Card
                className='card'
                onClick={() => handleCardClick("Entrenamiento Cognitivo")}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    className='cardContent'
                  >
                    Entrenamiento Cognitivo
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* <Grid item xs={3} className='grid-item'>
              <Card
                className='card'
                onClick={() => handleCardClick("Entrenamiento Conjunto")}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    className='cardContent'
                  >
                    Entrenamiento Conjunto
                  </Typography>
                </CardContent>
              </Card>
            </Grid> */}
          </Grid>
        </Box>
      </div>

      <div>
        <Footer></Footer>
      </div>
    </div>
    
  );
}

export default HomePage;
