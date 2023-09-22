import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Autocomplete, Button, IconButton, InputAdornment, OutlinedInput, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import "./SignUp.scss";
import { Auth } from '../../../api/auth';

import { ENV } from "../../../utils";
const { BASE_API_URL, API_ROUTES } = ENV;

const SignUp = () => {
    const auth = new Auth()
    const [names, setNames] = useState('');
    const [lastnames, setLastnames] = useState('');
    const [birthDay, setBirthDay] = useState(new Date());
    const [identification, setIdentification] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [genre, setGenre] = useState('');
    const [schooling, setSchooling] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSetNames = (event) => {
        setNames(event.target.value)
    }
    const handleSetLastnames = (event) => {
        setLastnames(event.target.value)
    }
    const handleSetBirthday = (date) => {
        setBirthDay(date)
    }
    const handleSetDocumentType = (event, type) => {
        setDocumentType(type)
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
    const handleSetPassword = (event) => {
        setPassword(event.target.value)
    }
    const handleSetGenre = (event, sex) => {
        setGenre(sex)
    }
    const handleSetSchooling = (event, school) => {
        setSchooling(school)
    }


    const handleClickShowPassword = () =>{
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    const handleSave = async () => {
        const data = {
            names: names,
            lastnames: lastnames,
            email: email,
            password: password,
            birthDay: (birthDay.$M + 1) + '/' + birthDay.$D + '/' + birthDay.$y,
            identification: identification,
            documentType: documentType.value,
            phone: phone,
            genre: genre.value,
            schooling: schooling.value
        }
        console.log(data);

        const opts = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        }
        
        console.log(opts.body);
        fetch(`${BASE_API_URL}${API_ROUTES.AUTH}`, opts)
        .then((response) =>{
            if (!response.ok) {
                throw new Error('No se pudo completar la solicitud');
              }
              return response.json();
        })
        
        /* try{
            const response = await auth.signup();
            console.log(response);
        }catch (error){
            console.log(error);
        }  */      
        
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
                        <div className='title-form'> <h2>Registro</h2></div>
                        <div className='reg-form__row'>
                            <TextField id="names" label="Nombres" variant="outlined" className='input-auth-form' value={names} onChange={handleSetNames} sx={{width: 300}} />
                        </div>
                        <div className='reg-form__row'>
                            <TextField id="lastnames" label="Apellidos" variant="outlined" className='input-auth-form'  value={lastnames} onChange={handleSetLastnames} sx={{width: 300}}/>
                        </div>
                        <div className='reg-form__row'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}  >
                            <DatePicker format="MM/DD/YYYY" label="Fecha de nacimiento" selected={birthDay} onChange={handleSetBirthday} sx={{ width: 300 }} />
                        </LocalizationProvider>
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
                        </div>
                        <div className='reg-form__row'>
                            <TextField id="identification" label="Numero de Documento" variant="outlined" className='input-auth-form' value={identification}  onChange={handleSetIdentification} sx={{width: 300}}/>
                        </div>
                        <div className='reg-form__row'>
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
                        </div>
                        <div className='reg-form__row'>
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
                        </div>
                        <div className='reg-form__row'>
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
                </form>
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
