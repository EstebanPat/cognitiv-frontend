import { Box, FormControl, IconButton, InputAdornment, InputLabel, Modal, OutlinedInput } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Autocomplete, Button, TextField } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';

import "./UserViewer.scss"
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Auth } from '../../../api/auth'
import Swal from 'sweetalert2';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const textInputStyles = {
    width:"100%",
    input: {
        fontSize: "1.063rem",
    }
};
    
const UserViewer = ({user, closeModal, disabled}) => {
    const auth = new Auth();
    const [userDb, setUserDb] = useState(null);

    const [selectedBirthDay, setSelectedBirthDay] = useState(null);
    const [selectedBirthDayAttendant, setSelectedBirthDayAttendant] = useState(null);
    const [selectedDocumentType, setSelectedDocumentType] = useState(null);
    const [selectedSchooling, setSelectedSchooling] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [selectedActive, setSelectedActive] = useState(null);

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSetPassword = (event) => {
        setPassword(event.target.value)
    }
    
    const handleClickShowPassword = () =>{
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const getUser = async () => {
        try {
          const response = await auth.getUserById(user);
          setUserDb(response)
        } catch (error) {
          console.error(error);
        }
    }

    const updatedUserDb = {
            ...userDb,
            birthDay: selectedBirthDay ? `${selectedBirthDay.$y}-${selectedBirthDay.$M + 1}-${selectedBirthDay.$D}` : null,
        }; 
        if (userDb && userDb.attendant && selectedBirthDayAttendant) {
            updatedUserDb.attendant = {
            ...userDb.attendant,
            birthDay: `${selectedBirthDayAttendant.$y}-${selectedBirthDayAttendant.$M + 1}-${selectedBirthDayAttendant.$D}`,
        };
        if (password) {
            updatedUserDb.password = password;
        }
    }

    const updateUser = async () => {
        Swal.fire({
            title: "¿Estás seguro que desea editar este usuario?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#55be98",
            cancelButtonColor: "darkred",
            confirmButtonText: "Editar",
            customClass: {
                container: 'swal-container-class'
            },
          }).then(async (result) => {
            if(result.value){
                try {
                    const response = await auth.updateAdmin(updatedUserDb, user); 
                    if(response === true){
                        Swal.fire({
                            title: "Editado",
                            text: "El usuario ha sido editado",
                            icon: "success",
                            customClass: {
                                container: 'swal-container-class'
                            }
                        });
                        closeModal()
                    }
                } catch (error) {
                    console.error(error);
                }
            }
          })  
    }

    const documentTypeOptions = [
        { value: "CC", label: "Cedula de ciudadanía"},
        { value: "CE", label: "Cedula extranjera"},
        { value: "TI", label: "Tarjeta de Identidad"},
        { value: "Pasaporte", label: "Pasaporte"}
    ]

    const schoolingOptions = [
        { value: "EP", label: "Educación Preescolar"},
        { value: "EB", label: "Edcación Básica"},
        { value: "EM", label: "Educación Media"},
        { value: "ES", label: "Educación Superior"}
    ]

    const genreOptions = [
        { value: "M", label: "Hombre"},
        { value: "F", label: "Mujer"},
        { value: "U", label: "Indefinido"}
    ]

    const activeOptions = [
        { value: true, label: "Activo"},
        { value: false, label: "Inactivo"},
    ]
    
    useEffect(() => {
        if (user && !userDb) {
            getUser();
        }
    
        if (userDb) {
          const birthDayDate = userDb && userDb.birthDay ? dayjs(userDb.birthDay) : null;
          setSelectedBirthDay(birthDayDate);
            
          if (userDb.attendant) {
            const attBirthDayDate = userDb.attendant.birthDay ? dayjs(userDb.attendant.birthDay) : null;
            setSelectedBirthDayAttendant(attBirthDayDate);
          }
    
          setSelectedDocumentType(
            userDb.documentType
              ? documentTypeOptions.find((option) => option.value === userDb.documentType)
              : null
          );
    
          setSelectedSchooling(
            userDb.schooling
              ? schoolingOptions.find((option) => option.value === userDb.schooling)
              : null
          );
    
          setSelectedGenre(
            userDb.genre
              ? genreOptions.find((option) => option.value === userDb.genre)
              : null
          );

          setSelectedActive(
            userDb.active
              ? activeOptions.find((option) => option.value === userDb.active)
              : activeOptions.find((option) => option.value === false)
          );
        }
    }, [user, userDb]);

    const handleUserChange = (field, value) => {
        if (field === 'selectedSchooling') {
            setUserDb(prevUserDb => ({
                ...prevUserDb,
                schooling: value ? value.value : null,
            }));
        } else if (field === 'selectedDocumentType') {
            setUserDb(prevUserDb => ({
                ...prevUserDb,
                documentType: value ? value.value : null,
            }));
        } else if (field === 'selectedGenre') {
            setUserDb(prevUserDb => ({
                ...prevUserDb,
                genre: value ? value.value : null,
            }));
        } else if (field === 'selectedActive') {
            const selectedValue = value ? value : null;
            setSelectedActive(selectedValue);
        
            if (selectedValue === null) {
              setSelectedActive(activeOptions.find((option) => option.value === false));
            }

            if (selectedValue !== null) {
                setUserDb(prevUserDb => ({
                    ...prevUserDb,
                    active: selectedValue.value,
                }));
            }


        } else if (field.startsWith('attendant.')) {
            const attendantField = field.split('.')[1];
            setUserDb(prevUserDb => ({
                ...prevUserDb,
                attendant: {
                    ...prevUserDb.attendant,
                    [attendantField]: value,
                },
            }));
        } else {
            setUserDb(prevUserDb => ({
                ...prevUserDb,
                [field]: value,
            }));
        }
    };

    return (
        <Modal open={true} onClose={closeModal}>
            <>
                <Box className="membership-modal-container" sx={{ maxHeight: '85vh', overflowY: 'auto' }}>
                    <form className='form'>
                        <div className='title'>
                            <h1>Usuario</h1>
                        </div>
                        <div className='reg-form__row'>
                            <TextField 
                                sx={textInputStyles} 
                                id="namesAttendant" 
                                label={"Id"} 
                                variant="outlined" 
                                className='input-auth-form' 
                                value={userDb ? userDb._id : ""}
                                disabled={true}
                            />
                        </div>
                        <div className='reg-form__row'>
                            <TextField 
                                sx={textInputStyles} 
                                id="namesAttendant" 
                                label={"Nombres"} 
                                variant="outlined" 
                                className='input-auth-form' 
                                value={userDb ? userDb.names : ""}
                                disabled={disabled}
                                onChange={(e) => handleUserChange('names', e.target.value)}
                            />
                            <TextField 
                                sx={textInputStyles} 
                                id="lastnamesAttendant" 
                                label="Apellidos" 
                                variant="outlined" 
                                className='input-auth-form' 
                                value={userDb ? userDb.lastnames : ""}
                                disabled={disabled}
                                onChange={(e) => handleUserChange('lastnames', e.target.value)}
                            />
                        </div>

                        <div className='reg-form__row'>
                            <TextField 
                                id="emailAttendant" 
                                label="Correo Electronico" 
                                variant="outlined" 
                                className='input-auth-form' 
                                sx={textInputStyles} 
                                value={userDb ? userDb.email : ""}
                                disabled={disabled}
                                onChange={(e) => handleUserChange('email', e.target.value)}
                            />
                            <TextField 
                                id="phoneAttendant" 
                                label="Telefono" 
                                variant="outlined" 
                                className='input-auth-form' 
                                sx={textInputStyles} 
                                value={userDb ? userDb.phone : ""}
                                disabled={disabled}
                                onChange={(e) => handleUserChange('phone', e.target.value)}
                            />
                        </div>

                        <div className='reg-form__row'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker 
                                    format="MM/DD/YYYY" 
                                    label="Fecha de nacimiento" 
                                    sx={textInputStyles} 
                                    value={selectedBirthDay}
                                    disabled={disabled}
                                    onChange={(newValue) => setSelectedBirthDay(newValue)}
                                />
                            </LocalizationProvider>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                margin="normal"
                                options={schoolingOptions}
                                sx={textInputStyles}
                                renderInput={(params) => <TextField {...params} label="Nivel de Escolaridad" />}
                                value={selectedSchooling}
                                disabled={disabled}
                                onChange={(event, newValue) => handleUserChange('selectedSchooling', newValue)}
                            />
                        </div>

                        <div className='reg-form__row'>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={documentTypeOptions}
                                sx={textInputStyles}
                                renderInput={(params) => <TextField {...params} label="Tipo de Documento" />}
                                value={selectedDocumentType}
                                disabled={true}
                                onChange={(event, newValue) => handleUserChange('selectedDocumentType', newValue)}
                            />
                            <TextField 
                                id="identification" 
                                label="Numero de Documento" 
                                variant="outlined" 
                                className='input-auth-form' 
                                sx={textInputStyles} 
                                value={userDb ? userDb.identification : ""}
                                disabled={true}
                                onChange={(e) => handleUserChange('identification', e.target.value)}
                            />
                        </div>

                        <div className='reg-form__row'>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                margin="normal"
                                options={genreOptions}
                                sx={textInputStyles}
                                renderInput={(params) => <TextField {...params} label="Sexo" />}
                                value={selectedGenre}
                                disabled={true}
                                onChange={(event, newValue) => handleUserChange('selectedGenre', newValue)}
                            />

                            {disabled === false ? 
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

                                :

                                <></>
                            }
                        </div>

                        <div className='reg-form__row'>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={activeOptions}
                                sx={textInputStyles}
                                renderInput={(params) => <TextField {...params} label="Estado" />}
                                value={selectedActive}
                                disabled={disabled}
                                onChange={(event, newValue) => handleUserChange('selectedActive', newValue)}
                            />
                        </div>

                        {/* Acudiente */}
                        {userDb && userDb.attendant !== null && userDb.attendant ? (
                            <>
                                <form className='form-two'>
                                    <div className='title'>
                                        <h1>Acudiente</h1>
                                    </div>
                                    <div className='reg-form__row'>
                                        <TextField 
                                            sx={textInputStyles} 
                                            id="namesAttendant" 
                                            label={"Nombres"} 
                                            variant="outlined" 
                                            className='input-auth-form' 
                                            value={userDb ? userDb.attendant.names : ""}
                                            disabled={disabled}
                                            onChange={(e) => handleUserChange('attendant.names', e.target.value)}
                                        />
                                        <TextField 
                                            sx={textInputStyles} 
                                            id="lastnamesAttendant" 
                                            label="Apellidos" 
                                            variant="outlined" 
                                            className='input-auth-form' 
                                            value={userDb ? userDb.attendant.lastnames : ""}
                                            disabled={disabled}
                                            onChange={(e) => handleUserChange('attendant.lastnames', e.target.value)}
                                        />
                                    </div>

                                    <div className='reg-form__row'>
                                        <TextField 
                                            id="emailAttendant" 
                                            label="Correo Electronico" 
                                            variant="outlined" 
                                            className='input-auth-form' 
                                            sx={textInputStyles} 
                                            value={userDb ? userDb.attendant.email : ""}
                                            disabled={disabled}
                                            onChange={(e) => handleUserChange('attendant.email', e.target.value)}
                                        />
                                        <TextField 
                                            id="phoneAttendant" 
                                            label="Telefono" 
                                            variant="outlined" 
                                            className='input-auth-form' 
                                            sx={textInputStyles} 
                                            value={userDb ? userDb.attendant.phone : ""}
                                            disabled={disabled}
                                            onChange={(e) => handleUserChange('attendant.phone', e.target.value)}
                                        />
                                    </div>

                                    <div className='reg-form__row'>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker 
                                                format="MM/DD/YYYY" 
                                                label="Fecha de nacimiento" 
                                                sx={textInputStyles} 
                                                value={selectedBirthDayAttendant}
                                                disabled={disabled}
                                                onChange={(newValue) => setSelectedBirthDayAttendant(newValue)}
                                            />
                                        </LocalizationProvider>
                                        <TextField 
                                            id="identification" 
                                            label="Numero de Documento" 
                                            variant="outlined" 
                                            className='input-auth-form' 
                                            sx={textInputStyles} 
                                            value={userDb ? userDb.attendant.identification : ""}
                                            disabled={disabled}
                                            onChange={(e) => handleUserChange('attendant.identification', e.target.value)}
                                        />
                                    </div>
                                </form>    
                            </>
                        ) : (
                            null 
                        )} 

                        <div className='reg-form__row'>
                            {disabled ? <></> : 
                                <Button variant="contained" style={{ background: "#357960", borderRadius: "10px" }} onClick={updateUser}>
                                    Editar
                                </Button>
                            }
                            <Button variant="contained" style={{ background: "darkred", borderRadius: "10px" }} onClick={closeModal}>
                                Cerrar
                            </Button>
                        </div>
                    </form>
                       
                </Box>
            </>
        </Modal>
    )
}

export default UserViewer;

