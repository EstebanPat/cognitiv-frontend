import React, { useState } from 'react'
import { Typography, List, ListItem, ListItemText, Modal, Button, Box, Card, CardContent } from '@mui/material';

import MembershipModal from './MembershipModal'


const MembershipList = ({ membership, showModal, closeModal}) => {



  return (

    <Card sx={{width: '100%', height: '100%'}} >
      <CardContent>
        <Typography variant="h5" component="div"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
            {membership.type}
        </Typography>
        <Typography variant="h5" component="div">
            {membership.description}
        </Typography>
        <Typography variant="h5" component="div"
          sx={{
            color: "green"
          }}
        >
            {membership.price}
        </Typography>
          
      </CardContent>

      <Button
        onClick={() => showModal(membership, closeModal)}
        variant="contained"
        color= "primary"
        sx={{
          border: '2px solid black', 
          backgroundColor: 'white',  
          color: 'black', 
          '&:hover': { 
            backgroundColor: 'lightgreen', 
            color: 'black', 
          },
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '16px', 
        }}
      >
        Suscribirse
      </Button>
                  
    </Card>
    
  )
}


export default MembershipList
