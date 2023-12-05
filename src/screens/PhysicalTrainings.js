import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/Surfaces/NavBar';
import Footer from '../components/Surfaces/Footer'
import "./PhysicalTrainings.scss"

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
    <div className='physical-main'>
      <div className='nav-container'>
        <NavBar showOptions={false}/>
      </div>

      <div className='trainings-cont'>
        <p>Entrenamientos físicos</p>
        <Box sx={{width:'100%', height:'100%'}}>  
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} className='phy-grid' justifyContent="center"
            height={'0%'}>
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

      <div className='footer'>
        <Footer></Footer>
      </div>
      
    </div>
  )
}

export default PhysicalTrainings
