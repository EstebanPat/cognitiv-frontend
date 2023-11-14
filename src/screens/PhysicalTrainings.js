import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
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
      height: "300px"
    }
  };
const PhysicalTrainings = () => {
    const navigate = useNavigate()
    const handleCardClick = (text) => {
        // Aquí puedes realizar alguna acción cuando se hace clic en la card
        console.log(`Hiciste clic en ${text}`);
        if(text === "No Inmersivo"){
          navigate("nonimmersive")
        }else if(text === "Inmersivo"){
            
        }
      };
  return (
    <div>
      <Typography variant='h2'>Entrenamientos Fisicos</Typography>
      <Box>
        <Grid container spacing={2}>
            <Grid item xs={5} style={cardStyles.grid}>
                <Card
                    sx={cardStyles.card}
                    onClick={() => handleCardClick("Inmersivo")}
                >
                    <CardContent>
                        <Typography
                            variant='h5'
                            component="div"
                            sx={cardStyles.cardContent}
                        >Realidad Virtual Inmersiva </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={5} >
                <Card
                    sx={cardStyles.card}
                    onClick={() => handleCardClick("No Inmersivo")}
                >
                    <CardContent>
                        <Typography
                            variant='h5'
                            component="div"
                            sx={cardStyles.cardContent}
                        >Realidad Virtual NO Inmersiva </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default PhysicalTrainings
