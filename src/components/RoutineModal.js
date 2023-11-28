import { Box, Button, Modal, Typography } from '@mui/material'
import React from 'react'
import './RoutineModal.scss'
const RoutineModal = ({closeModal, lastFinishedRoutine}) => {

    const fecha = new Date(lastFinishedRoutine);
    fecha.setDate(fecha.getDate() + 1);
    const limitDate = fecha.toLocaleDateString();
    
    const limitHour = fecha.toLocaleTimeString();

  return (

    <Modal open={true} onClose={closeModal}>
        <Box className='modal-container'>
            <Typography variant='h5'>
                No puede realizar la rutina
            </Typography>
            <Typography variant='h6'>
                Debe esperar hasta el
            </Typography>
            <Typography variant='h6' color={'blue'}>
                {limitDate} a las {limitHour}
            </Typography>
            <Typography variant='h6'>
                Para poder Realizarla
            </Typography>
            <Button onClick={closeModal} variant="contained" color="error" className="close-button">
                Cerrar
            </Button>
        </Box>
    </Modal>
  )
}

export default RoutineModal
