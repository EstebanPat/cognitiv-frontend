import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Routines } from '../api/routines/index'
import { Button, Card, CardContent, List, ListItem, Tooltip, Typography } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom';
import './RoutinesView.scss'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RoutineModal from '../components/RoutineModal';

import logoICO from "../assets/icons/logoICO.png"

const RoutinesView = () => {
    const navigate = useNavigate();
    const routineApi = new Routines();
    const { state } = useLocation();
    const { routines, routineList_id } = state;
    const [allRoutines, setAllRoutines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [lastFinished, setLastFinished] = useState(null);
    let isFirstUnfinishedRoutine = false;


    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false)
    }
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
                navigate('trainings', { state: { routine: routine, routineList_id: routineList_id}})
            }else{
                setLastFinished(lastFinishedRoutineDate.toString())
                openModal();
            }
        } else {
            navigate('trainings', { state: { routine: routine, routineList_id: routineList_id}})
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
                                        <div className='routine-card-content-day'>
                                            <Typography variant="p" component="div" fontSize={22} fontFamily={'fantasy'}>
                                                DIA {routine.order}
                                            </Typography>
                                        </div>
                                        <div className='exercises'>
                                            <Typography fontFamily={'cursive'} fontSize={20} 
                                                fontWeight={'bold'} sx={{marginBottom: "10px"}}
                                                >Ejercicios de
                                            </Typography>
                                            <Typography fontFamily={'cursive'} fontSize={16}
                                                sx={{marginLeft: "12px"}}
                                                >Flexibilidad
                                            </Typography>
                                            <Typography fontFamily={'cursive'} fontSize={16}
                                                sx={{marginLeft: "12px"}}
                                                >Flexibilidad
                                            </Typography>
                                            <Typography fontFamily={'cursive'} fontSize={16}
                                                sx={{marginLeft: "12px"}}
                                                >Flexibilidad
                                            </Typography>
                                            <Typography fontFamily={'cursive'} fontSize={16}
                                                sx={{marginLeft: "12px"}}
                                                >Equilibrio
                                            </Typography>
                                            <Typography fontFamily={'cursive'} fontSize={16}
                                                sx={{marginLeft: "12px"}}
                                                >Flexibilidad
                                            </Typography>
                                        </div>
                                    </CardContent>
                                    <Button onClick={() => doRoutine(routine)} variant="contained"
                                        color="primary" className='routine-button'>
                                        Empezar
                                    </Button>
                                </Card>
                            </ListItem>
                        );
                    } else if(routine.finish === true){
                        return (
                            <ListItem key={routine._id} className='routine-list-item'>
                                <Card className='routine-card'>
                                    <CardContent className='routine-card-content'>
                                        <div className='routine-card-content-day'>
                                            <Typography variant="p" component="div" fontSize={22} fontFamily={'fantasy'}>
                                                DIA {routine.order}
                                            </Typography>
                                        </div>
                                        <div className='exercises'>
                                            <Typography fontFamily={'cursive'} fontSize={20} 
                                                fontWeight={'bold'} sx={{marginBottom: "10px"}}
                                                >Ejercicios de
                                            </Typography>
                                            <Typography fontFamily={'cursive'} fontSize={16}
                                                sx={{marginLeft: "12px"}}
                                                >Flexibilidad
                                            </Typography>
                                            <Typography fontFamily={'cursive'} fontSize={16}
                                                sx={{marginLeft: "12px"}}
                                                >Flexibilidad
                                            </Typography>
                                            <Typography fontFamily={'cursive'} fontSize={16}
                                                sx={{marginLeft: "12px"}}
                                                >Flexibilidad
                                            </Typography>
                                            <Typography fontFamily={'cursive'} fontSize={16}
                                                sx={{marginLeft: "12px"}}
                                                >Equilibrio
                                            </Typography>
                                            <Typography fontFamily={'cursive'} fontSize={16}
                                                sx={{marginLeft: "12px"}}
                                                >Flexibilidad
                                            </Typography>
                                        </div>
                                    </CardContent>
                                    <div className='checkicon'>
                                        <Tooltip title="Terminado" arrow >
                                            <CheckCircleIcon  style={{ color: 'green', fontSize: 40 }}/>
                                        </Tooltip>
                                    </div>
                                    
                                </Card>
                            </ListItem>
                        );
                    } else {
                        return (
                            <ListItem key={routine._id} className='routine-list-item'>
                                <Card className='routine-card'>
                                    <CardContent className='routine-card-content'>
                                        <div className='routine-card-content-day'>
                                            <Typography variant="p" component="div" fontSize={22} fontFamily={'fantasy'}>
                                                DIA {routine.order}
                                            </Typography>
                                        </div>
                                        <div className='exercises'>
                                            <Typography fontFamily={'cursive'} fontSize={20} 
                                                fontWeight={'bold'} sx={{marginBottom: "10px"}}
                                                >Ejercicios de
                                            </Typography>
                                            <Typography fontFamily={'cursive'} fontSize={16}
                                                sx={{marginLeft: "12px"}}
                                                >Flexibilidad
                                            </Typography>
                                            <Typography fontFamily={'cursive'} fontSize={16}
                                                sx={{marginLeft: "12px"}}
                                                >Flexibilidad
                                            </Typography>
                                            <Typography fontFamily={'cursive'} fontSize={16}
                                                sx={{marginLeft: "12px"}}
                                                >Flexibilidad
                                            </Typography>
                                            <Typography fontFamily={'cursive'} fontSize={16}
                                                sx={{marginLeft: "12px"}}
                                                >Equilibrio
                                            </Typography>
                                            <Typography fontFamily={'cursive'} fontSize={16}
                                                sx={{marginLeft: "12px"}}
                                                >Flexibilidad
                                            </Typography>
                                        </div>
                                    </CardContent>
                                    <img src={logoICO} alt='' className='logo'></img>
                                </Card>
                            </ListItem>
                        );
                    }
                })
            }
        </List>
        {showModal && <RoutineModal closeModal={closeModal} lastFinishedRoutine={lastFinished}/> }
    </div>
  )
}

export default RoutinesView
