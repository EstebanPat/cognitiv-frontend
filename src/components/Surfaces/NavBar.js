import React, { useEffect, useState } from 'react'
import "./NavBar.css"
import logo from "../../assets/images/global/logoNav.png"

import { Link } from 'react-scroll';
import { useNavigate , NavLink , Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { Auth } from '../../api';
 
const NavBar = () => {
    const auth = new Auth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [user, setUser] = useState(null)

    const logOut = () => {
		localStorage.removeItem("access");
		navigate("/");
	}

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenMenu = () => {
        setMenuOpen(!menuOpen)
    }

    useEffect(() => {
        if(auth.getAccessToken() !== null){
            auth.getMe()
            .then((response)=> {
                setUser(response)
            })
            .catch((error) => {
                console.error('Error al activar cuenta', error);
            })
        }
    }, [])

    return (
    <>
        <nav>
            {auth.getAccessToken() === null ? 
                <>
                    <Link to={"login"} smooth={true} offset={-110} duration={500} className='title'>
                        <img src={logo} alt='' className='logo'></img>
                    </Link> 

                    <div>
                        <ul className={menuOpen ? "openMenu" : "menu"}>
                            <li>
                                <Link to={"aboutUs"} smooth={true} offset={-100} duration={500} onClick={handleOpenMenu}>
                                    ¿Quienes somos?
                                </Link>
                            </li>

                            <li>
                                <Link to={"team"} smooth={true} offset={-60} duration={500} onClick={handleOpenMenu}>
                                    Equipo
                                </Link>
                            </li>

                            <li>
                                <Link to={"team"} smooth={true} offset={580} duration={500} onClick={handleOpenMenu}>
                                    Experiencias
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className='mobile'>
                        <i className='menu-btn' onClick={handleOpenMenu}>
                            {menuOpen ? 
                                <CloseIcon/>
                                :
                                <MenuIcon/>
                            }
                        </i>
                    </div>
                    
                </>
                :
                <>
                    <RouterLink to="/home" className='title'><img src={logo} alt='' className='logo'></img></RouterLink>

                    <div className='auth-menu'>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="success"
                            className='icon-container'
                        >
                            <p style={{fontSize:'1.2rem', fontWeight:'bold', marginRight:'5px'}}>
                                {user && (user.names)}
                            </p><AccountCircle/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            sx={{position:'absolute', color:"#357960"}}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Perfil</MenuItem>
                            {user && (user.rol === "admin") && (<MenuItem onClick={() => {navigate("/dashboard/admin/users")}}>Dashboard</MenuItem>)}
                            <MenuItem onClick={logOut}>Cerrar sesión</MenuItem>                
                        </Menu>
                    </div>
                </>
            }     
        </nav>
    </>
    )
}

export default NavBar
