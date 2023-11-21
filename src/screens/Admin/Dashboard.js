import { Box, Typography } from '@mui/material'
import React , { useEffect, useState } from 'react'
import SideNav from '../../components/Surfaces/Admin/SideNav'
import { Route , Routes , Outlet, useNavigate} from "react-router-dom";
import { Auth } from '../../api';

const Dashboard = () => {
  const auth = new Auth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null)

  useEffect(() => {
    if(auth.getAccessToken() !== null){
        auth.getMe()
        .then((response)=> {
            if(response.rol !== "admin"){
              navigate("/home")
            }
        })
        .catch((error) => {
            console.error(error);
        })
    }else{
      navigate("/")
    }
}, [])

  return (
    <div className='bg-dash'>
        <Box sx={{ display: "flex", padding:0 }}>
            <SideNav></SideNav>
            <Box height={60}></Box>
            <Box component="main" sx={{ flexGrow: 1, padding:3 , marginTop:10 }}>
                <Outlet></Outlet>
            </Box>
        </Box>
    </div>
  )
}

export default Dashboard
