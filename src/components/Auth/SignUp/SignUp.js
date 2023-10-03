import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Autocomplete, Button, Checkbox, FormControlLabel, IconButton, InputAdornment, OutlinedInput, Snackbar, TextField } from '@mui/material'
import MuiAlert from '@mui/material/Alert';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import "./SignUp.scss";
import { Auth } from '../../../api/index';

const SignUp = () => {
    const auth = new Auth()

    /* Information of the Attendant (if the user needs one) */
    const [namesAttendant, setNamesAttendant] = useState('');
    const [lastnamesAttendant, setLastnamesAttendant] = useState('');
    const [birthDayAttendant, setBirthDayAttendant] = useState(new Date());
    const [identificationAttendant, setIdentificationAttendant] = useState('');
    const [phoneAttendant, setPhoneAttendant] = useState('');
    const [emailAttendant, setEmailAttendant] = useState('');

    
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
    const [laterality, setLaterality] = useState('');
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
        setShowSecondForm(true);
        
        if(checkBox === 'checkboxMe'){
            setCheckbox(checkBox);
            setCheckboxMe(!checkboxMe);
            if(checkboxOther) setCheckboxOther(false);
            handleSetNamesMe(namesAttendant)
            handleSetLastnamesMe(lastnamesAttendant);
            handleSetBirthdayMe(birthDayAttendant);
            handleSetIdentificationMe(identificationAttendant);
            handleSetPhoneMe(phoneAttendant);
            handleSetEmailMe(emailAttendant);
        }else if(checkBox === 'checkboxOther'){
            setCheckbox(checkBox);
            setCheckboxOther(!checkboxOther);
            if(checkboxMe) setCheckboxMe(false);
            handleSetNamesMe('')
            handleSetLastnamesMe('');
            handleSetBirthdayMe('');
            handleSetIdentificationMe('');
            handleSetPhoneMe('');
            handleSetEmailMe('');
        }
    }

    const handleSave = async () => {
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
        
        console.log(data);
        
        try{
            const response = await auth.register(data);
            console.log(response);
        }catch (error){
            console.log(error);
        }       
        
    }

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
    <div> 
        <div className='container'>
            <div className='reg-container-one'>
                <div className=''></div>
            </div>
            <div className='reg-container-two'>
                
                <form>
                    <div className='reg-form'>
                        <div className='title-form'> <h2>Datos Personales</h2></div>
                        <div className='reg-form__row'>
                            <TextField id="namesAttendant" label="Nombres" variant="outlined" className='input-auth-form' value={namesAttendant} onChange={handleSetNamesAttendant} sx={{width: 300}} />
                            <TextField id="lastnamesAttendant" label="Apellidos" variant="outlined" className='input-auth-form'  value={lastnamesAttendant} onChange={handleSetLastnamesAttendant} sx={{width: 300}}/>
                        </div>
                        
                        <div className='reg-form__row'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}  >
                                <DatePicker format="MM/DD/YYYY" label="Fecha de nacimiento" selected={birthDayAttendant}  onChange={handleSetBirthdayAttendant} sx={{ width: 300 }} />
                            </LocalizationProvider>
                            <TextField id="identificationAttendant" label="Numero de Documento" variant="outlined" className='input-auth-form' value={identificationAttendant}  onChange={handleSetIdentificationAttendant} sx={{width: 300}}/>
                        </div>
                        
                        
                        <div className='reg-form__row'>
                            <TextField id="emailAttendant" label="Correo Electronico" variant="outlined" className='input-auth-form' value={emailAttendant} onChange={handleSetEmailAttendant} sx={{width: 300}}/>
                            <TextField id="phoneAttendant" label="Telefono" variant="outlined" className='input-auth-form' value={phoneAttendant} onChange={handleSetPhoneAttendant} sx={{width: 300}}/>
                            
                        </div>
                    </div>
                </form>

                <div className='title-form'> <h2>¿Quien usará COGNITIV?</h2></div>
                <div className='reg-checkbox'>
                    <FormControlLabel checked={checkboxMe} name='checkboxMe' onChange={() => handleCheckBoxes('checkboxMe')} control={<Checkbox />} label="YO" />
                    <FormControlLabel checked={checkboxOther} name='checkboxOther' onChange={() => handleCheckBoxes('checkboxOther')} control={<Checkbox />} label="Otra Persona" />
                </div>
                
                {showSecondForm && (
                    <form>
                        <div className='reg-form'>
                            <div className='reg-form__row'>
                                <div className='reg-form'>
                                    <div className='title-form'> <h2>Datos del Usuario</h2></div>
                                    <div className='reg-form__row'>
                                        <TextField id="names" label="Nombres" variant="outlined" className='input-auth-form' value={names} onChange={handleSetNames} sx={{width: 300}} />
                                        <TextField id="lastnames" label="Apellidos" variant="outlined" className='input-auth-form'  value={lastnames} onChange={handleSetLastnames} sx={{width: 300}}/>
                                    </div>
                                    
                                    <div className='reg-form__row'>
                                        <Autocomplete  
                                            disablePortal
                                            id="combo-box-demo"
                                            options={documentTypeOptions}
                                            sx={{ width: 300 }}
                                            renderInput={(params) => <TextField {...params} label="Tipo de Documento" />}
                                            value={documentType}
                                            onChange={handleSetDocumentType}
                                        />                  
                                        <TextField id="identification" label="Numero de Documento" variant="outlined" className='input-auth-form' value={identification}  onChange={handleSetIdentification} sx={{width: 300}}/>
                                    </div>
                                    <div className='reg-form__row'>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}  >
                                            <DatePicker format="MM/DD/YYYY" label="Fecha de nacimiento" selected={birthDay}  onChange={handleSetBirthday} sx={{ width: 300 }} />
                                        </LocalizationProvider>
                                        <TextField id="phone" label="Telefono" variant="outlined" className='input-auth-form' value={phone} onChange={handleSetPhone} sx={{width: 300}}/>
                                    </div>
                                    
                                    <div className='reg-form__row'>
                                        <Autocomplete 
                                            disablePortal
                                            id="combo-box-demo"
                                            margin="normal"
                                            options={genreOptions}
                                            sx={{ width: 300 }}
                                            renderInput={(params) => <TextField {...params} label="Sexo" />}
                                            value={genre}
                                            onChange={handleSetGenre}
                                        />            
                                        <Autocomplete 
                                            disablePortal
                                            id="combo-box-demo"
                                            margin="normal"
                                            options={schoolingOptions}
                                            sx={{ width: 300 }}
                                            renderInput={(params) => <TextField {...params} label="Nivel de Escolaridad" />}
                                            value={schooling}
                                            onChange={handleSetSchooling}
                                        />       
                                    </div>
                                    <div className='reg-form__row'>
                                        <TextField id="email" label="Correo Electronico" variant="outlined" className='input-auth-form' value={email} onChange={handleSetEmail} sx={{width: 300}}/>
                                        
                                        <OutlinedInput
                                            sx={{ width: 300 }}
                                            id="outlined-adornment-password"
                                            label="Password"
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
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                   </form>
                )}
                
                <div className='reg-button'>
                    <Button variant="contained" color="success" onClick={handleSave}>
                        Registrese en Cognitiv
                    </Button>

                </div>
                
            </div>
        </div>
        

      
    </div>
  )
}

export default SignUp
