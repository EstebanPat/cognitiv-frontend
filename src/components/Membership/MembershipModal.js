import React, { useState } from 'react';
import { Modal, Typography, Button, Box, Divider } from '@mui/material';
import { Suscription } from '../../api/suscriptions';
import nequiLogo from '../../assets/images/global/nequi.png'
import SendIcon from '@mui/icons-material/Send';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import './MembershipModal.scss'; 

const MembershipModal = ({ userId, membership, closeModal }) => {
  const navigate = useNavigate();
  const suscription = new Suscription();
  const [selectedFile, setSelectedFile] = useState(null); 
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openSnackbarType, setOpenSnackbarType] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    const extension = file.name.split(".").pop().toLowerCase();
    if(file !== null && file !== undefined){
      if (allowedExtensions.includes(extension)) {
        setSelectedFile(file);
      } else {
        setOpenSnackbarType(true);
      }
    } 
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
    setOpenSnackbarType(false);
  };

  const handleSubmit = async () => {
    try {
      if (membership.type !== "Freemium"){
        if (selectedFile) {
          const response = await suscription.newSuscription(
            userId,
            membership._id,
            12,
            selectedFile
          );
          navigate('/successRegistration');
        } else {
          setOpenSnackbar(true);
        }
      }else{
        const response = await suscription.newSuscription(
          userId,
          membership._id,
          12,
          null
        );
        navigate('/successRegistration');
      }
    } catch (error) {
      console.error('Error al enviar datos al servidor:', error);
    }
  };

  return (
    <Modal open={true} onClose={closeModal}>
      <>
      <Box className="membership-modal-container">
        <Typography variant="h4" className="modal-title">
          Sección de pago
        </Typography>

        <Divider variant="middle" className="divider" />

        <Typography variant="body1" className="plan-info">
          Plan seleccionado: {membership.type}
        </Typography>

        <Divider variant="middle" className="divider" />

        <Typography variant="body1" className="plan-info">
          Total a pagar: {membership.price}
        </Typography>

        <Divider variant="middle" className="divider" />

        {membership.type === "Freemium" ? 
          <></> :
          <>
            <div className='logo'>
              <img src={nequiLogo} alt=''></img>
              <div className='payment-method-info'>
                <p>Banco: Nequi</p>
                <p>Cuenta: 3216417455</p>
                <p>Nombre del titular: Carolina Vasquez</p>
              </div>
            </div>

            <input
                accept="image/*"
                id="contained-button-file"
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none'}}
            />
            <div className="voucher-button-container">
                <label htmlFor="contained-button-file">
                    <Button
                        variant="outlined"
                        component="span"
                        color='success'
                    >
                      Comprobante de pago
                    </Button>
                </label>
            </div>
          </>
        }


        {/* <Input
          type="file"
          onChange={handleFileChange}
          className="file-input"
          label="Adjunte un comprobante de pago"
        /> */}

        <Box className="button-container">
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="success"
            className="submit-button"
            endIcon={<SendIcon />}
          >
            Suscribirse
          </Button>
          <Button
            onClick={closeModal}
            variant="outlined"
            color="error"
            endIcon={<CloseOutlinedIcon />}
          >
            Cerrar
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="error"
        >
          ¡Adjunte un comprobante de pago antes de suscribirse!
        </MuiAlert>
      </Snackbar>

      <Snackbar
        open={openSnackbarType}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="error"
        >
          Debe subir un archivo de tipo imagen
        </MuiAlert>
      </Snackbar>
      </>
    </Modal>
    
  );
};

export default MembershipModal;
