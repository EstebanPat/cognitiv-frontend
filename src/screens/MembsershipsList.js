import React, { useEffect, useState } from 'react'
import MembershipCard from '../components/Membership/MembershipCard'
import { Membership } from '../api/memberships/index'
import MembershipModal from '../components/Membership/MembershipModal'
import { List, ListItem, Typography } from '@mui/material'

const Membserships = () => {
    const membership = new Membership()
    const [memberships, setMemberships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMembership, setSelectedMembership] = useState(null);

    const showModal = (membership) => {
        setSelectedMembership(membership)
    }

    const closeModal = () => {
        setSelectedMembership(null)
    }
    useEffect(() => {

      membership.getAll()
      .then((response)=> {
        console.log(response);
        setMemberships(response)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error al obtener las membresías:', error);
        setLoading(false);
      })
        
    }, [])

  return (
    <div>
      <Typography variant="h2">Tipos de planes</Typography>
      <List
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: '500px',
      }}
    >
      {memberships &&
        memberships.map((membership) => (
          <ListItem key={membership._id} sx={{ marginRight: 1, padding: 0, height: '100%' }}>
            <MembershipCard membership={membership} showModal={showModal} closeModal={closeModal} />
          </ListItem>
        ))}
    </List>

    {selectedMembership && (
      <MembershipModal membership={selectedMembership} closeModal={closeModal} />
    )}
    </div>
    
  )
}

export default Membserships
