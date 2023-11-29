import { Box, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Autocomplete, Button, TextField } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';

import "./UserViewer.scss"
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Suscription } from '../../../api/suscriptions/index'
import Swal from 'sweetalert2';

const textInputStyles = {
    width:"100%",
    input: {
        fontSize: "1.063rem",
    }
};
    
const SubViewer = ({sub, closeModal, disabled}) => {
    const subs = new Suscription();
    const [subDb, setSubDb] = useState(null);
    const [selectedStartDate, setSelectedStartDate] = useState(null)
    const [selectedEndDate, setSelectedEndDate] = useState(null)
    const [selectedActive, setSelectedActive] = useState(null);

    const activeOptions = [
        { value: true, label: "Activo"},
        { value: false, label: "Inactivo"},
    ]

    const getSub = async () => {
        try {
          const response = await subs.getSubById(sub);
          setSubDb(response)
        } catch (error) {
          console.error(error);
        }
    }

    const updateSub = async () => {
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
                    const response = await subs.activateSub(subDb._id, subDb);
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
    
    useEffect(() => {
        if (sub && !subDb) {
            getSub();
        }
    
        if (subDb) {
          const start_date = subDb && subDb.start_date ? dayjs(subDb.start_date) : null;
          setSelectedStartDate(start_date);
        }

        if (subDb) {
            const end_date = subDb && subDb.expiration_date ? dayjs(subDb.expiration_date) : null;
            setSelectedEndDate(end_date);
        }

    }, [sub, subDb]);

    const handleUserChange = (field, value) => {
        let updatedSubDb = { ...subDb };
    
        switch (field) {
            case 'selectedActive':
                updatedSubDb = {
                ...subDb,
                active: value ? value.value : null,
                };
                break;
        
            default:
                break;
        }
    
        setSubDb(updatedSubDb);
    };

    return (
        <Modal open={true} onClose={closeModal}>
            <>
                <Box className="user-modal-container" sx={{ maxHeight: '85vh', overflowY: 'auto' }}>
                    <form className='form' style={{width:'100%'}}>
                        <div className='title'>
                            <h1>Suscripción</h1>
                        </div>
                        <div className='reg-form__row'>
                            <TextField 
                                sx={textInputStyles} 
                                id="user" 
                                label={"Id"} 
                                variant="outlined" 
                                className='input-auth-form' 
                                value={subDb ? subDb._id : ""}
                                disabled={true}
                            />

                            <TextField 
                                id="dur" 
                                label="Duración" 
                                variant="outlined" 
                                className='input-auth-form' 
                                sx={textInputStyles} 
                                value={subDb ? subDb.duration : ""}
                                disabled={true}
                            />
                        </div>

                        <div className='reg-form__row'>
                            <TextField 
                                sx={textInputStyles} 
                                id="user" 
                                label={"Usuario"} 
                                variant="outlined" 
                                className='input-auth-form' 
                                value={subDb ? subDb.user_id : ""}
                                disabled={true}
                            />

                            <TextField 
                                id="memb" 
                                label="Memebresía" 
                                variant="outlined" 
                                className='input-auth-form' 
                                sx={textInputStyles} 
                                value={subDb ? subDb.membership_id : ""}
                                disabled={true}
                            />
                        </div>

                        <div className='reg-form__row'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker 
                                    format="MM/DD/YYYY" 
                                    label="Fecha de inicio" 
                                    sx={textInputStyles} 
                                    value={selectedStartDate}
                                    disabled={true}
                                />
                            </LocalizationProvider>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker 
                                    format="MM/DD/YYYY" 
                                    label="Fecha final" 
                                    sx={textInputStyles} 
                                    value={selectedEndDate}
                                    disabled={true}
                                />
                            </LocalizationProvider>
                        </div>

                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={activeOptions}
                            sx={textInputStyles}
                            renderInput={(params) => <TextField {...params} label="Estado" />}
                            value={
                                subDb ?
                                    activeOptions.find((option) => option.value === subDb.active) || null
                                    : activeOptions.find((option) => option.value === false)
                            }
                            disabled={false}
                            onChange={(event, newValue) =>
                                handleUserChange('selectedActive', newValue)
                            }
                        />

                        <div className='reg-form__row'>
                            {subDb && subDb.voucher && (
                                <img
                                    src={`http://localhost:3000${subDb.voucher}`}
                                    alt="Voucher"
                                    style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }}
                                />
                            )}
                        </div>

                        <div className='reg-form__row'>
                            {disabled ? <></> : 
                                <Button variant="contained" style={{ background: "#357960", borderRadius: "10px" }} onClick={updateSub}>
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

export default SubViewer;

