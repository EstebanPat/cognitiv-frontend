import React, { useEffect } from 'react'
import { Auth } from '../api/index'
import { Routines } from '../api/routines/index'
import { useLocation } from 'react-router-dom'
const ActivateView = () => {
    const auth = new Auth();
    const routines = new Routines();
    const location = useLocation()

    const searchToken = new URLSearchParams(location.search)
    const token = searchToken.get('token')
    useEffect(() => {
        auth.activateAccount(token)
        .then((response)=> {
            console.log(response);
        })
        .catch((error) => {
            console.error('Error al activar cuenta', error);
        })

        routines.createRoutines(token)
        .then((response)=> {
          console.log(response);
        })
        .catch((error) => {
            console.error('Error al crear rutinas', error);
        })
    })
  return (
    <div>
      SE ACTIVO SU CUENTA 
    </div>
  )
}

export default ActivateView
