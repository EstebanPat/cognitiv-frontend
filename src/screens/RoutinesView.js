import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Routines } from '../api/routines/index'
import { Button, Card, CardContent, List, ListItem, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import './RoutinesView.scss'

const RoutinesView = () => {
    const routineApi = new Routines()
    const {state} = useLocation()
    const { routines } = state;
    const [allRoutines, setAllRoutines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [firstFalse, setFirstFalse] = useState(false);
    let isFirstUnfinishedRoutine = false;

    const list = []
    useEffect(() => {

        const fetchData = async () => {
            try {
                const routinesData = await Promise.all(
                    routines.map(async (routine) => {
                        const response = await routineApi.getRoutine(routine);
                        return response;
                    })
                );
                setAllRoutines(routinesData);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [routines]);

    const doRoutine = (routine) => {
        const finishedRoutines = allRoutines.filter(routine => routine.finish === true);
        const lastFinishedRoutine = finishedRoutines.pop();
        const fechaActual = new Date();
        if (lastFinishedRoutine) {
            const lastFinishedRoutineDate = new Date(lastFinishedRoutine.date);
            const diferenciaEnMilisegundos = fechaActual - lastFinishedRoutineDate;
            const milisegundosEnUnDia = 24 * 60 * 60 * 1000;
            if(diferenciaEnMilisegundos >= milisegundosEnUnDia){
                console.log("Si la puede realizar");
                
            }else{
                console.log("No la puede realizar");
            }
        } else {
            console.log("No ha realizado ninguna rutina", lastFinishedRoutine);
        }

    }
  return (
    <div className='routines-container'>
        
        <List className='routines-list-container'>
            {allRoutines &&
                allRoutines.map((routine, index) => {
                    

                    if (routine.finish === false && !isFirstUnfinishedRoutine) {
                        isFirstUnfinishedRoutine = true;
                        return (
                            <ListItem key={routine._id} className='routine-list-item'>
                                <Card className='routine-card'>
                                    <CardContent className='routine-card-content'>
                                        <div>
                                            <Typography variant="p" component="div">
                                                DIA {routine.order}
                                            </Typography>
                                        </div>
                                    </CardContent>
                                    <Button onClick={() => doRoutine(routine)}>
                                        Empezar
                                    </Button>
                                </Card>
                            </ListItem>
                        );
                    } else {
                        return (
                            <ListItem key={routine._id} className='routine-list-item'>
                                <Card className='routine-card'>
                                    <CardContent className='routine-card-content'>
                                        <div>
                                            <Typography variant="p" component="div">
                                                DIA {routine.order}
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </Card>
                            </ListItem>
                        );
                    }
                })
            }
        </List>
        
    </div>
  )
}

export default RoutinesView
