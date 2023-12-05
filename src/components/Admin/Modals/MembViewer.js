import { Box, Button, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TextField } from '@mui/material'
import { Membership } from "../../../api/memberships/index"
import Swal from 'sweetalert2';
import "./MembViewer.scss"

const textInputStyles = {
    width:"100%",
    "& .MuiInputBase-input": {
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    input: {
        fontSize: "1.063rem",
        "& .MuiInputBase-input": {
            overflow: "hidden",
            textOverflow: "ellipsis"
        }
    }
};
    
const MembViewer = ({member, closeModal, disabled}) => {
    const memb = new Membership();
    const [membDb, setMembDb] = useState(null);

    const getMemb = async () => {
        try {
          const response = await memb.getMembById(member);
          setMembDb(response)
          console.log(response)
        } catch (error) {
          console.error(error);
        }
    }

    const updateSub = async () => {
        /* Swal.fire({
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
                    const response = await subs.activateSub(membDb._id, membDb);
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
        }) */  
    }
    
    useEffect(() => {
        if (memb && !membDb) {
            getMemb();
        }
    }, [memb, membDb]);

    return (
        <Modal open={true} onClose={closeModal}>
            <>
                <Box className="memb-modal-container" sx={{ maxHeight: '85vh', overflowY: 'auto' }}>
                    <form className='form' style={{width:'100%'}}>
                        <div className='title'>
                            <h1>Membresía</h1>
                        </div>
                        <div className='reg-form__row'>
                            <TextField 
                                sx={textInputStyles} 
                                id="user" 
                                label={"Id"} 
                                variant="outlined" 
                                className='input-auth-form' 
                                value={membDb ? membDb._id : ""}
                                disabled={true}
                            />
                        </div>
                        
                        <div className='reg-form__row'>
                            <TextField 
                                id="type" 
                                label="Tipo" 
                                variant="outlined" 
                                className='input-auth-form' 
                                sx={textInputStyles} 
                                value={membDb ? membDb.type : ""}
                                disabled={disabled}
                            />
                        </div>

                        <div className='reg-form__row'>
                            <TextField 
                                id="desc" 
                                label="Descripción" 
                                variant="outlined" 
                                className='input-auth-form' 
                                sx={textInputStyles} 
                                value={membDb ? membDb.description : ""}
                                disabled={disabled}
                            />
                        </div>

                        <div className='reg-form__row'>
                            <TextField 
                                id="addons" 
                                label="Adiciones" 
                                variant="outlined" 
                                className='input-auth-form' 
                                sx={textInputStyles} 
                                value={membDb ? membDb.addons : ""}
                                disabled={disabled}
                            />
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

export default MembViewer;