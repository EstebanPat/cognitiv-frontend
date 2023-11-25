import React, { useEffect, useState } from 'react'
import { Button, Card, CardContent, List, ListItem, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';

import { Routines } from '../api/routines/index';
import './NonImmersive.scss'

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
    <div className='list-container'>
      <Typography variant='h2'>RUTINAS</Typography>
      <List >
        {routinesList &&
          routinesList.map((routine) => (
            <ListItem key={routine._id}>
              <Card>
                <CardContent>
                <div>
                  <Typography variant="p" component="div">
                    Rutina {routine._id}
                  </Typography>
                  {!routine.finished && (
                    <Button onClick={() => goToRoutines(routine.routines)}>En proceso</Button>
                  )}
                </div>
                </CardContent>
              </Card>
            </ListItem>
          ))
        }
      </List>
    </div>
  )
}

export default NonImmersive
