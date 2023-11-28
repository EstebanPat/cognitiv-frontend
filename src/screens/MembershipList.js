import React, { useEffect, useState } from 'react'
import MembershipCard from '../components/Membership/MembershipCard'
import { Membership } from '../api/memberships/index'
import MembershipModal from '../components/Membership/MembershipModal'
import { List, ListItem, Typography } from '@mui/material'
import { Link, useLocation } from "react-router-dom";
import "./MembershipList.scss"
import logo from "../assets/images/global/logoNav.png"

const Membserships = () => {
    const membership = new Membership()
    const {state} = useLocation();
    const { userId } = state;
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
        setMemberships(response)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error al obtener las membresías:', error);
        setLoading(false);
      })
        
    }, [])

    return (
      <div className='memb-container'>
        <div className='header'>
          <Link to="/"><img src={logo} alt='' className='logo'></img></Link>
        </div>

        <div className='memb-list'>
          <List
            className='memb-list-container'
          >
            {memberships &&
              memberships.map((membership) => (
                <ListItem key={membership._id} sx={{ marginRight: 1, padding: 0, height: '100%' }}>
                  <MembershipCard membership={membership} showModal={showModal} closeModal={closeModal} />
                </ListItem>
              ))}
          </List>
        </div>
        {selectedMembership && (
          <MembershipModal membership={selectedMembership} userId={userId} closeModal={closeModal} />
        )}
      </div>
    )
}

export default Membserships
