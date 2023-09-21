import React, { useState } from 'react'
import "./NavBar.css"
import logo from "../../assets/images/global/logoNav.png"
import { BrowserRouter, Link, NavLink } from "react-router-dom";

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
  return (
    <BrowserRouter>
        <nav>
            <Link to="/" className="title">
                <img src={logo} alt='' className='logo'></img>
            </Link>
            <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? "open" : ""}>
                <li>
                    <NavLink to="/about">¿Quienes somos?</NavLink>
                </li>
                <li>
                    <NavLink to="/services">Servicio</NavLink>
                </li>
                <li>
                    <NavLink to="/services">Contacto</NavLink>
                </li>
                <li className='special'>
                    <NavLink to="/services">Ingresar</NavLink>
                </li>
                <li className='special'>
                    <NavLink to="/services">Registrarse</NavLink>
                </li>
            </ul>
        </nav>
    </BrowserRouter>
  )
}

export default NavBar
