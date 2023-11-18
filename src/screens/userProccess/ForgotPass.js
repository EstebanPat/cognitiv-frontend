import React, { useState } from 'react';
import "./ForgotPass.scss"
import logo from "../../assets/images/global/logoNav.png"
import MuiAlert from '@mui/material/Alert';
import { Snackbar, TextField } from '@mui/material'
import { Auth } from '../../api';
import { useNavigate } from "react-router-dom";
import ForgotPassModal from '../../components/Auth/ForgotPassword/ForgotPassModal';

const textInputStyles = {
    width:"100%",
    
    input: {
        fontSize: "1rem",
    }
};

const ForgotPass = () => {
    const auth = new Auth()
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [identification, setIdentification] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [error, setError] = useState("")

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleSetIdentification = (event) => {
        setIdentification(event.target.value)
    }

    const handleSave = async () => {
        if(!identification){
            setError("Debes ingresar una identificación")
            setOpenSnackbar(true)
        }else{
            setError("")
            setOpenSnackbar(false)

            try {
                const response = await auth.forgotpass(identification);
                console.log(response)
                if(response.message === "Correo enviado"){
                    setShowModal(true);
                }
            } catch (error) {
                setError(error.message)
                setOpenSnackbar(true)
            }
        }
    }

    return (
        <div className='main-view'>
            <div className='forgot-form-container'>
                <form className='forgot-form'>
                    <div className='logo-form'>
                        <img src={logo} alt='' className='logo'></img>
                    </div>

                    <p> Restablecimiento de contraseña </p>

                    <p style={{textAlign:'center'}}> Ingresa el documento de identidad con el que inicias sesión en Cognitiv </p>

                    <div className='id-input'>
                        <TextField id="identification" label="Numero de Documento" variant="outlined" className='input-auth-form' onChange={handleSetIdentification} sx={textInputStyles} />
                    </div>

                    <div className='send-button'>
                        <a className='button' onClick={handleSave}>Continuar</a>
                    </div>
                </form>

                {showModal && <ForgotPassModal closeModal={() => setShowModal(false)} />}
            </div>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MuiAlert           
                    elevation={6}
                    variant="filled"
                    onClose={handleSnackbarClose}
                    severity="error"
                >
                    {error}
                </MuiAlert>
            </Snackbar>

        </div>
    )
}

export default ForgotPass
