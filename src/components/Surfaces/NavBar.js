import React, { useState } from 'react'
import "./NavBar.css"
import logo from "../../assets/images/global/logoNav.png"
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
  return (
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
                <NavLink to="/experiences">Experiencias significativas</NavLink>
            </li>
            <li>
                <NavLink to="/services">Servicio</NavLink>
            </li>
            <li>
                <NavLink to="/services">Contacto</NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default NavBar
