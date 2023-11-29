import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Autocomplete, Button, Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar, TextField } from '@mui/material'
import MuiAlert from '@mui/material/Alert';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import "./SignUp.scss";
import { Auth } from '../../../api/index';
import logo from '../../../assets/images/global/logoSignUp.png'
import { Link, useNavigate } from "react-router-dom";

const textInputStyles = {
    width:"100%",
    input: {
        fontSize: "1.063rem",
    }
};

const SignUp = () => {
    const auth = new Auth()
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openSnackbarDuplicated, setOpenSnackbarDuplicated] = useState(false);
    const [openSnackbarTerms, setOpenSnackbarTerms] = useState(false);
    const [openSnackbarValidation, setOpenSnackbarValidation] = useState(false);
    const [errorValidation, setErrorValidation] = useState("")

    /* Information of the Attendant (if the user needs one) */
    const [namesAttendant, setNamesAttendant] = useState('');
    const [lastnamesAttendant, setLastnamesAttendant] = useState('');
    const [birthDayAttendant, setBirthDayAttendant] = useState(new Date());
    const [identificationAttendant, setIdentificationAttendant] = useState('');
    const [phoneAttendant, setPhoneAttendant] = useState('');
    const [emailAttendant, setEmailAttendant] = useState('');

    //Terms
    const [acceptTerms, setAcceptTerms] = useState(false);

    const [names, setNames] = useState('');
    const [lastnames, setLastnames] = useState('');
    const [birthDay, setBirthDay] = useState(new Date());
    const [identification, setIdentification] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [password, setPassword] = useState('');
    const [genre, setGenre] = useState('');
    const [schooling, setSchooling] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [checkboxMe, setCheckboxMe] = useState(false);
    const [checkbox, setCheckbox] = useState('');
    const [checkboxOther, setCheckboxOther] = useState(false);
    const [showSecondForm, setShowSecondForm] = useState(false);

    /* Handle Functions for the attendant Information */
    const handleSetNamesAttendant = (event) => {
        setNamesAttendant(event.target.value)
    }

    const handleSetLastnamesAttendant = (event) => {
        setLastnamesAttendant(event.target.value)
    }

    const handleSetBirthdayAttendant = (date) => {
        setBirthDayAttendant(date)
    }

    const handleSetIdentificationAttendant = (event) => {
        setIdentificationAttendant(event.target.value)
    }

    const handleSetPhoneAttendant = (event) => {
        setPhoneAttendant(event.target.value)
    }

    const handleSetEmailAttendant = (event) => {
        setEmailAttendant(event.target.value)
    }

    /* Handle Functions for the user Information */
    const handleSetNames = (event) => {
        setNames(event.target.value)
    }

    const handleSetLastnames = (event) => {
        setLastnames(event.target.value)
    }

    const handleSetBirthday = (date) => {
        setBirthDay(date)
    }

    const handleSetIdentification = (event) => {
        setIdentification(event.target.value)
    }

    const handleSetPhone = (event) => {
        setPhone(event.target.value)
    }

    const handleSetEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleSetDocumentType = (event, type) => {
        setDocumentType(type)
    }

    const handleSetPassword = (event) => {
        setPassword(event.target.value)
    }

    const handleSetGenre = (event, sex) => {
        setGenre(sex)
    }

    const handleSetSchooling = (event, school) => {
        setSchooling(school)
    }

    /* Handle Information IF there is not an attendant */
    const handleSetNamesMe = (value) => {
        setNames(value)
    }

    const handleSetLastnamesMe = (value) => {
        setLastnames(value)
    }

    const handleSetBirthdayMe = (date) => {
        setBirthDay(date)
    }

    const handleSetIdentificationMe = (value) => {
        setIdentification(value)
    }

    const handleSetPhoneMe = (value) => {
        setPhone(value)
    }

    const handleSetEmailMe = (value) => {
        setEmail(value)
    }

    /* Functions for the Password */
    const handleClickShowPassword = () =>{
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    /* Select the Person who is going to use Cognitiv */
    const handleCheckBoxes = (checkBox) => {
        if (checkBox === 'checkboxMe') {
            setShowSecondForm(!checkboxMe);
            setCheckbox(checkBox);
            setCheckboxMe(!checkboxMe);
            if (checkboxOther) setCheckboxOther(false);
            handleSetNamesMe(namesAttendant);
            handleSetLastnamesMe(lastnamesAttendant);
            handleSetBirthdayMe(birthDayAttendant);
            handleSetIdentificationMe(identificationAttendant);
            handleSetPhoneMe(phoneAttendant);
            handleSetEmailMe(emailAttendant);
        } else if (checkBox === 'checkboxOther') {
            setCheckbox(checkBox);
            setCheckboxOther(!checkboxOther);
            setShowSecondForm(!checkboxOther);  // Cambiar a !checkboxOther
            if (checkboxMe) setCheckboxMe(false);
            handleSetNamesMe('');
            handleSetLastnamesMe('');
            handleSetBirthdayMe('');
            handleSetIdentificationMe('');
            handleSetPhoneMe('');
            handleSetEmailMe('');
        }
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbarDuplicated(false)
        setOpenSnackbarTerms(false)
        setOpenSnackbar(false);
        setOpenSnackbarValidation(false);
    };

    const handleAcceptTerms = (event) => {
        setAcceptTerms(event.target.checked);
    }

    const handleSave = async () => {
        setOpenSnackbarDuplicated(false)
        setOpenSnackbarTerms(false)
        setOpenSnackbar(false);
        setOpenSnackbarValidation(false);

        if (
            !names ||
            !lastnames ||
            !birthDay ||
            !identification ||
            !phone ||
            !email ||
            !documentType ||
            !password ||
            !genre ||
            !schooling ||
            (showSecondForm && (!namesAttendant || !lastnamesAttendant || !birthDayAttendant || !identificationAttendant || !phoneAttendant || !emailAttendant))
        ) {
            setOpenSnackbar(true);
            return;
        }

        const stringRegex = /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/;
        if (!stringRegex.test(names) 
            || !stringRegex.test(namesAttendant) 
            || !stringRegex.test(lastnames)
            || !stringRegex.test(lastnamesAttendant)){
            setErrorValidation("Los nombres y apellidos no pueden contener números");
            setOpenSnackbarValidation(true);
            return;
        }

        const phoneRegex = /^\d+$/;
        if (!phoneRegex.test(phone.trim()) || !phoneRegex.test(phoneAttendant.trim())){
            setErrorValidation("El teléfono debe estar compuesto por solo numeros");
            setOpenSnackbarValidation(true);
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;       
        if (!emailRegex.test(email) || !emailRegex.test(emailAttendant)){
            setErrorValidation("Debe ingresar un email válido");
            setOpenSnackbarValidation(true)
            return
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!-/:-@[-`{-~]).{6,}$/;
        if (!passwordRegex.test(password)) {
            if (password.length < 6) {
                setErrorValidation("La contraseña debe tener al menos 6 caracteres");
                setOpenSnackbarValidation(true)
                return
            }
            if (!/(?=.*[A-Z])/.test(password)) {
                setErrorValidation("La contraseña debe contener al menos una letra mayúscula");
                setOpenSnackbarValidation(true)
                return
            }
            if (!/(?=.*[0-9])/.test(password)) {
                setErrorValidation("La contraseña debe contener al menos un número");
                setOpenSnackbarValidation(true)
                return
            }    
            if (/[!-~]/.test(password)) {
                setErrorValidation("La contraseña debe contener al menos un carácter especial");
                setOpenSnackbarValidation(true);
                return;
            }
        }

        if(acceptTerms === false){
            setOpenSnackbarTerms(true);
            return;
        }

        const data = {
            names: names,
            lastnames: lastnames,
            email: email,
            password: password,
            birthDay: birthDay.$y + '-' + (birthDay.$M + 1) + '-' + birthDay.$D   ,
            identification: identification,
            documentType: documentType.value,
            phone: phone,
            genre: genre.value,
            schooling: schooling.value
        }

        if (checkbox === 'checkboxOther') {
            const attendant = {
                names: namesAttendant,
                lastnames: lastnamesAttendant,
                email: emailAttendant,
                birthDay: (birthDayAttendant.$M + 1) + '/' + birthDayAttendant.$D + '/' + birthDayAttendant.$y,
                identification: identificationAttendant,
                phone: phoneAttendant,
            }
            data.attendant = attendant
        }

        try {
            const response = await auth.register(data);
            navigate('/signup/membership', { state: { userId: response } });
        } catch (error) {
            setOpenSnackbarDuplicated(true)
            console.log(error);
        }
    };

    const documentTypeOptions = [
        { value: "CC", label: "Cedula de ciudadanía"},
        { value: "CE", label: "Cedula extranjera"},
        { value: "TI", label: "Tarjeta de Identidad"},
        { value: "Pasaporte", label: "Pasaporte"}
    ]

    const genreOptions = [
        { value: "M", label: "Hombre"},
        { value: "F", label: "Mujer"},
        { value: "U", label: "Indefinido"}
    ]

    const schoolingOptions = [
        { value: "EP", label: "Educación Preescolar"},
        { value: "EB", label: "Edcación Básica"},
        { value: "EM", label: "Educación Media"},
        { value: "ES", label: "Educación Superior"}
    ]

    return (
        <div className='reg-main-container'>
            <div className='reg-container'>
                <form>
                    <div className='reg-form'>
                        <div className='logo'><img src={logo} className='logo-img'></img></div>
                        <div className='title-form'><h2>Datos Personales</h2></div>
                        <div className='reg-form__row'>
                            <TextField sx={textInputStyles} id="namesAttendant" label="Nombres" variant="outlined" className='input-auth-form' value={namesAttendant} onChange={handleSetNamesAttendant} />
                            <TextField sx={textInputStyles} id="lastnamesAttendant" label="Apellidos" variant="outlined" className='input-auth-form' value={lastnamesAttendant} onChange={handleSetLastnamesAttendant} />
                        </div>
                        <div className='reg-form__row'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker format="MM/DD/YYYY" label="Fecha de nacimiento" selected={birthDayAttendant} onChange={handleSetBirthdayAttendant} sx={textInputStyles} />
                            </LocalizationProvider>
                            <TextField id="identificationAttendant" label="Numero de Documento" variant="outlined" className='input-auth-form' value={identificationAttendant} onChange={handleSetIdentificationAttendant} sx={textInputStyles} />
                        </div>
                        <div className='reg-form__row'>
                            <TextField id="emailAttendant" label="Correo Electronico" variant="outlined" className='input-auth-form' value={emailAttendant} onChange={handleSetEmailAttendant} sx={textInputStyles} />
                            <TextField id="phoneAttendant" label="Telefono" variant="outlined" className='input-auth-form' value={phoneAttendant} onChange={handleSetPhoneAttendant} sx={textInputStyles} />
                        </div>
                    </div>
                </form>
    
                <div className='title-form'><h2>¿Quien usará COGNITIV?</h2></div>
                <div className='reg-checkbox'>
                    <FormControlLabel checked={checkboxMe} name='checkboxMe' onChange={() => handleCheckBoxes('checkboxMe')} control={<Checkbox className='checkbox' />} label="Yo" />
                    <FormControlLabel checked={checkboxOther} name='checkboxOther' onChange={() => handleCheckBoxes('checkboxOther')} control={<Checkbox className='checkbox' />} label="Otra Persona" />
                </div>
    
                {showSecondForm && (
                    <form>
                        <div className='reg-form'>
                            <div className='reg-form__row'>
                                <div className='reg-form'>
                                    <div className='title-form'><h2>Datos del Usuario</h2></div>
                                    <div className='reg-form__row'>
                                        <TextField id="names" label="Nombres" variant="outlined" className='input-auth-form' value={names} onChange={handleSetNames} sx={textInputStyles} />
                                        <TextField id="lastnames" label="Apellidos" variant="outlined" className='input-auth-form' value={lastnames} onChange={handleSetLastnames} sx={textInputStyles} />
                                    </div>
                                    <div className='reg-form__row'>
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={documentTypeOptions}
                                            sx={textInputStyles}
                                            renderInput={(params) => <TextField {...params} label="Tipo de Documento" />}
                                            value={documentType}
                                            onChange={handleSetDocumentType}
                                        />
                                        <TextField id="identification" label="Numero de Documento" variant="outlined" className='input-auth-form' value={identification} onChange={handleSetIdentification} sx={textInputStyles} />
                                    </div>
                                    <div className='reg-form__row'>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker format="MM/DD/YYYY" label="Fecha de nacimiento" selected={birthDay} onChange={handleSetBirthday} sx={textInputStyles} />
                                        </LocalizationProvider>
                                        <TextField id="phone" label="Telefono" variant="outlined" className='input-auth-form' value={phone} onChange={handleSetPhone} sx={textInputStyles} />
                                    </div>
                                    <div className='reg-form__row'>
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            margin="normal"
                                            options={genreOptions}
                                            sx={textInputStyles}
                                            renderInput={(params) => <TextField {...params} label="Sexo" />}
                                            value={genre}
                                            onChange={handleSetGenre}
                                        />
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            margin="normal"
                                            options={schoolingOptions}
                                            sx={textInputStyles}
                                            renderInput={(params) => <TextField {...params} label="Nivel de Escolaridad" />}
                                            value={schooling}
                                            onChange={handleSetSchooling}
                                        />
                                    </div>
                                    <div className='reg-form__row'>
                                        <TextField id="email" label="Correo Electronico" variant="outlined" className='input-auth-form' value={email} onChange={handleSetEmail} sx={textInputStyles} />
                                        <FormControl sx={textInputStyles}>
                                            <InputLabel htmlFor="outlined-adornment-confirm-password">Contraseña</InputLabel>
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
                                </div>
                            </div>
                        </div>
                        <div className='reg-form__row'>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={acceptTerms}
                                        onChange={handleAcceptTerms}
                                        name="acceptTerms"
                                        color="primary"
                                        className='checkbox'
                                    />
                                }
                                className="terms-checkbox"
                                label={<p>Acepto los <Link to="/privacypolicy" target='_blank'>Terminos y condiciones de Cognitiv</Link> </p>}
                            />
                        </div>
                    </form>
                )}
    
                <div className='reg-button'>
                    <Button variant="contained" style={{ background: "#357960", borderRadius: "10px" }} onClick={handleSave}>
                        Registrese en Cognitiv
                    </Button>
                </div>

                <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
                    <MuiAlert           
                        elevation={6}
                        variant="filled"
                        onClose={handleSnackbarClose}
                        severity="error"
                    >
                        Hay campos vacíos o inválidos
                    </MuiAlert>
                </Snackbar>

                <Snackbar open={openSnackbarDuplicated} autoHideDuration={3000} onClose={handleSnackbarClose}>
                    <MuiAlert           
                        elevation={6}
                        variant="filled"
                        onClose={handleSnackbarClose}
                        severity="error"
                    >
                        Esta identification ya ha sido registrada
                    </MuiAlert>
                </Snackbar>

                <Snackbar open={openSnackbarTerms} autoHideDuration={3000} onClose={handleSnackbarClose}>
                    <MuiAlert           
                        elevation={6}
                        variant="filled"
                        onClose={handleSnackbarClose}
                        severity="error"
                    >
                        Debe aceptar los términos y condiciones
                    </MuiAlert>
                </Snackbar>

                <Snackbar open={openSnackbarValidation} autoHideDuration={3000} onClose={handleSnackbarClose}>
                    <MuiAlert           
                        elevation={6}
                        variant="filled"
                        onClose={handleSnackbarClose}
                        severity="error"
                    >
                        {errorValidation}
                    </MuiAlert>
                </Snackbar>
            </div>
        </div>
    );
     
}

export default SignUp
