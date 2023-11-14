import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const handleCardClick = (text) => {
    // Aquí puedes realizar alguna acción cuando se hace clic en la card
    console.log(`Hiciste clic en ${text}`);
    if(text === "Entrenamiento Fisico"){
      navigate("physicaltrainings")
    }else if(text === "Entrenamiento Cognitivo"){

    }else if(text === "Entrenamiento Conjunto"){

    }
  };

  return (
    <div>
      <Typography variant="h2">Entrenamientos</Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 60px)" // Ajusta la altura según tus necesidades
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
  );
}

export default HomePage;
