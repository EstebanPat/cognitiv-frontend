import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Routines } from '../api/routines/index';
import './TrainingView.scss'
import { Typography, Button } from '@mui/material';

const TrainingView = () => {
    const trainingApi = new Routines();
    const navigate = useNavigate();
    const { state } = useLocation()
    const { routine, routineList_id } = state;
    const [allTrainings, setAllTrainings] = useState([]);
    const [actualTraining, setActualTraining] = useState([]);
    const [actualTrainingType, setActualTrainingType] = useState('');
    const [loading, setLoading] = useState(true);
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [buttonContent, setButtonContent] = useState('Siguiente Ejercicio')
    const [trainingTimes, setTrainingTimes] = useState([]);
    const [lastTime, setLastTime] = useState(0);
    const [finishRoutine, setFinishRoutine] = useState('')

    const timer = useRef() 
    const timerFormat = (time) => {
        let hours = Math.floor(time / 60 / 60 % 24)
        let minutes = Math.floor(time / 60 % 60)
        let seconds = Math.floor(time % 60)

        hours = hours < 10 ? '0' + hours : hours 
        minutes = minutes < 10 ? '0' + minutes : minutes 
        seconds = seconds < 10 ? '0' + seconds : seconds 

        return hours + ':' + minutes + ':' + seconds
    }
    useEffect(() => {
        console.log(routine);
        const fetchData = async () => {
            try {
                const trainingsData = await Promise.all(
                    routine.trainings.map(async (training) => {
                        const response = await trainingApi.getTraining(training);
                        console.log(response);
                        return response;
                    })
                );
                setAllTrainings(trainingsData);
                setActualTraining(trainingsData[0])
                setActualTrainingType(trainingsData[0].type)
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchData();
    }, [])

    useEffect(() => {
        if (running){
            timer.current = setInterval(() => {
                setTime(pre => pre + 1)
            }, 1000)
        }
        return () => clearInterval(timer.current)
    }, [running]);

    useEffect(() => {
        if (finishRoutine === "Finalizar") {
          console.log(trainingTimes);
          finish();
        }
      }, [buttonContent, trainingTimes]);

    const handleNextVideo = () => {
        const info = {
            training_id: actualTraining._id,
            time: time 
        }
    
        setTrainingTimes([... trainingTimes, info])
        console.log(info);
        const currentIndex = allTrainings.findIndex(training => training === actualTraining);
        const nextIndex = (currentIndex + 1) % allTrainings.length;
        setActualTraining(allTrainings[nextIndex]);
        setActualTrainingType(allTrainings[nextIndex].type);
        setTime(0)
        
        if(currentIndex === 3){
            setButtonContent("Finalizar Rutina");
        }

        if(currentIndex === 4){
            setFinishRoutine("Finalizar");
        } 
        
    };

    const showSeconds = () => {
        console.log(time);
    }

    const finish = async () => {
        const trainingInfo = {
            routine_id: routine._id,
            routinelist_id: routineList_id,
            trainings_times: trainingTimes
        }
        
        try {
            const response = await trainingApi.finishRoutine(routine._id);
            const response2 = await trainingApi.createTrainingInfo(trainingInfo)
        } catch (error) {
            console.log(error);
        }
        

        
        navigate('/home/physicaltrainings/nonimmersive', )
    }

    return (
        <div className='container'> 
            <div className='title'>
                <Typography fontSize={38} fontFamily={'monospace'}>
                    Rutina del dia {routine.order}
                </Typography>
            </div>
            
            <div className='container-training'>
                <div className='video-wrapper'>
                    <iframe
                        width="600"
                        height="400"
                        src={actualTraining.video}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className='info-training'>
                    <div className='description'>
                     <Typography fontSize={30} fontFamily={'unset'}>Ejercicio de {actualTrainingType}</Typography>
                    </div>
                    <div className='timer'>
                        <Typography fontSize={30}>Tiempo transcurrido</Typography>
                        <Typography className='time' fontSize={70} color={'#004D0B'} fontFamily={'fantasy'}>{timerFormat(time)}</Typography>
                        <div className='actions'>
                            <Button variant="contained" color="primary" onClick={()=> {
                                if(running) clearInterval(timer.current)
                                setRunning(!running)
                            }}>{running ? 'Detener': "Iniciar"}</Button>
                            <Button variant="contained" color="primary" onClick={()=> setTime(0)}>Reiniciar</Button>
                        </div>
                    </div>
                    
                </div>

            </div>
            
            <div className='training-button'>
                <Button variant="contained" color="primary" onClick={handleNextVideo}>
                    {buttonContent}
                </Button>
            </div>
            
        </div>
        
    );
}

export default TrainingView;


/* <div className='training-container'>
            <div className='training-title'>
                <Typography>Rutina dia {routine.order}</Typography>
            </div>

            <div className='training-row'>
                
                

                <div></div>
            </div>

        </div> */