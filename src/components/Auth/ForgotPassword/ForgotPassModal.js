import React, { useState, useEffect } from 'react';
import { Modal, Typography, Button, Divider, Box } from '@mui/material';
import './ForgotPassModal.scss';
import { useNavigate } from 'react-router-dom'; 

const ForgotPassModal = ({ closeModal, passwordChanged }) => {
    const navigate = useNavigate(); 
    const [showModal, setShowModal] = useState(true);

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/'); 
    };

    /* useEffect(() => {
        let timer;
        if (showModal) {
            timer = setTimeout(() => {
                handleCloseModal();
            }, 10000);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [showModal, handleCloseModal]); */

    return (
        <Modal open={showModal} onClose={handleCloseModal}>
            <Box className="forgot-pass-modal-container">
                <Typography variant="h4" className="modal-title">
                    Restablecimiento de contraseña
                </Typography>

                { passwordChanged === false ? 
                    <>
                        <Typography variant="body1" className="message">
                        ¡Correo enviado con éxito!
                        </Typography>

                        <Typography variant="body1" className="message">
                            Revisa tu correo electrónico para continuar con el proceso de restablecimiento
                        </Typography>
                    </>
                    :
                    <>
                        <Typography variant="body1" className="message">
                            Su contraseña ha sido restablecida
                        </Typography>
                    </>
                }
                

                <Button onClick={handleCloseModal} variant="contained" color="error" className="close-button">
                    Cerrar
                </Button>
            </Box>
        </Modal>
    );
};

export default ForgotPassModal;
