import React, { useEffect, useState } from 'react'
import { Modal, Typography, Button, Box, Input } from '@mui/material';
import { Suscription } from '../../api/suscriptions';
const MembershipModal = ({ membership, closeModal}) => {
  const suscription = new Suscription();
  const [membershipId, setMembershipId] = useState(null)
  const [duration, setDuration] = useState(null)
  const [selectedFile, setSelectedFile] = useState({}); // Estado para el archivo seleccionado


  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Obtiene el archivo seleccionado
    console.log(file);
    setSelectedFile(file);
    console.log(selectedFile);   
  };

  const handleSubmit = async () => {
    try {
      /* const formData = new FormData();
      formData.append('voucher', selectedFile);
      formData.append('user_id', "650d43dbf9a6b95f725d0a43")
      formData.append('membership_id', )
      formData.append('duration') */
      const response = await suscription.newSuscription(membership._id, 12, selectedFile);
      
      console.log('Respuesta del servidor:', response);

      
    } catch (error) {
      console.error('Error al enviar datos al servidor:', error);
    }
  };
  return (
  <Modal open={true} onClose={closeModal}>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      minWidth: '300px', 
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
    }}
  >
    <Typography variant="h4" sx={{marginBottom: 1}}>Suscripcion</Typography>
    <Typography variant="body1"> PLAN:  {membership.type}</Typography>
    <Typography variant="body1"> Total a pagar:  {membership.price}</Typography>

    <Typography variant="h5" >Comprobante de pago</Typography>
    <Input
      type="file"
      onChange={handleFileChange}
      sx={{
        marginTop: '16px', 
        padding: '8px', 
        borderRadius: '4px', 
        border: '1px solid #ccc', 
        backgroundColor: 'transparent', 
      }}
    />
    <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ marginTop: '16px' }}>
      Enviar
    </Button>
    <Button onClick={closeModal} variant="contained" color="primary" sx={{ marginTop: '16px' }}>
      Cerrar
    </Button>
    
  </Box>
</Modal>
  )
}

export default MembershipModal
