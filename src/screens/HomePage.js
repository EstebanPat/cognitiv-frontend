import React , { useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import NavBar from '../components/Surfaces/NavBar'
import "./HomePage.scss"

import { Auth } from '../api/auth';

const cardStyles = {
  card: {
    height: '100%',
    cursor: 'pointer',
    transition: 'box-shadow 0.3s',
    '&:hover': {
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    },
  },
  cardContent: {
    fontWeight: 'bold',
    textAlign: 'center',
  },

  grid:{
    height: "500px"
  }
};

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

    }else if(text === "Entrenamiento Conjunto"){

    }
  };

  return (

    <div className='home-main'>
      <div className='nav-container'>
        <NavBar showOptions={false}/>
      </div>
      <div className='options'>
        <Typography variant="h2">Entrenamientos</Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="calc(100vh - 60px)" 
        >
          <Grid container spacing={2}>
            <Grid item xs={4} style={cardStyles.grid}>
              <Card
                sx={cardStyles.card}
                onClick={() => handleCardClick("Entrenamiento Fisico")}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={cardStyles.cardContent}
                  >
                    Entrenamiento Físico
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={4}>
              <Card
                sx={cardStyles.card}
                onClick={() => handleCardClick("Entrenamiento Cognitivo")}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={cardStyles.cardContent}
                  >
                    Entrenamiento Cognitivo
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={4}>
              <Card
                sx={cardStyles.card}
                onClick={() => handleCardClick("Entrenamiento Conjunto")}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={cardStyles.cardContent}
                  >
                    Entrenamiento Conjunto
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
    
  );
}

export default HomePage;
