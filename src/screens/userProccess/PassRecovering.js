import React, { useEffect, useState } from 'react';
import logo from "../../assets/images/global/logoNav.png"
import MuiAlert from '@mui/material/Alert';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Auth } from '../../api';
import { useNavigate, useLocation } from "react-router-dom";
import ForgotPassModal from '../../components/Auth/ForgotPassword/ForgotPassModal';

const textInputStyles = {
    width:"100%",
    
    input: {
        fontSize: "1rem",
    }
};

const PassRecovering = () => {
    const auth = new Auth()
    const navigate = useNavigate();
    const location = useLocation()

    // Modal
    const [showModal, setShowModal] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // password
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    //Error
    const [error, setError] = useState("")

    //Token
    const searchToken = new URLSearchParams(location.search)
    const token = searchToken.get('token')

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

    /* Functions for the Password */
    const handleClickShowPassword = () =>{
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleSetPassword = (event) => {
        setPassword(event.target.value)
    }

    const handleSetConfirmPassword = (event) => {
        setConfirmPass(event.target.value)
    }

    const handleSave = async () => {
        if(!password || !confirmPass){
            setError("Hay campos vacíos")
            setOpenSnackbar(true)
        }else if(password !== confirmPass){
            setError("Las contraseñas no coinciden")
            setOpenSnackbar(true)
        }else{
            setError("")
            setOpenSnackbar(false)
            setShowModal(true)

            try {

                const data = {
                    password: password
                }
                const response = await auth.update(data, token)
                console.log(response)
                if(response === true){
                    setShowModal(true);
                }
            } catch (error) {
                setError(error.message || 'Ocurrió un error');
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

                    <p style={{textAlign:'center'}}> Ingresa una nueva contraseña para tu cuenta</p>

                    <div className='id-input'>
                        <FormControl sx={textInputStyles}>
                            <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                label="Contraseña"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                value={password}
                                onChange={handleSetPassword}
                            />
                        </FormControl>
                    </div>

                    <div className='id-input'>
                        <FormControl sx={textInputStyles}>
                            <InputLabel htmlFor="outlined-adornment-confirm-password">Confirmar contraseña</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-confirm-password"
                                label="Confirmar contraseña"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                value={confirmPass}
                                onChange={handleSetConfirmPassword}
                            />
                        </FormControl>
                    </div>

                    <div className='send-button'>
                        <a className='button' onClick={handleSave}>Continuar</a>
                    </div>
                </form>

                {showModal && <ForgotPassModal closeModal={() => setShowModal(false)} passwordChanged={true}/>}
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

export default PassRecovering
