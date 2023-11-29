import React, { useEffect, useState } from 'react'
import { Button, Card, CardContent, List, ListItem, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import { Routines } from '../api/routines/index';
import './NonImmersive.scss'
import NavBar from '../components/Surfaces/NavBar';
import Footer from '../components/Surfaces/Footer';

const NonImmersive = () => {

  const navigate = useNavigate();
  const routines = new Routines();
  const [routinesList, setRoutinesList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    routines.getAllListRoutines()
    .then((response) => {
      console.log(response);
      setRoutinesList(response);
      setLoading(false)
    })
    .catch((error) => {
      console.log('Error al traer las rutinas', error);
      setLoading(false)
    })
  }, [])

  const goToRoutines = (routines) => {
    navigate('routines', { state: { routines: routines}})
  }

  return (
    <div className='noim-container'>
      <div className='nav-container'>
        <NavBar showOptions={false}/>
      </div>

      <div className='list-container'>
        <p className='list-title'>Rutinas</p>
        <List className='rut-list-container'>
          {routinesList &&
            routinesList.map((routine) => (
              <ListItem key={routine._id} >
                <Card className='card-rut'>
                  <CardContent sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <div>
                      <div className='dec-icons' style={{ display:'flex', flexDirection:'row', justifyContent:'space-evenly' }}>
                        <PsychologyIcon></PsychologyIcon> 
                        <FitnessCenterIcon></FitnessCenterIcon>
                        <SportsGymnasticsIcon></SportsGymnasticsIcon>
                      </div>
                      
                      <p className='title-rut'>
                        Rutina actual
                      </p>
                      {!routine.finished && (
                        <Button onClick={() => goToRoutines(routine.routines)} sx={{marginTop:10}} variant="contained" color="success">
                          En proceso
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </ListItem>
            ))
          }
        </List>
      </div>

      <div className='footer'>
        <Footer></Footer>
      </div>
    </div>
    
  )
}

export default NonImmersive
