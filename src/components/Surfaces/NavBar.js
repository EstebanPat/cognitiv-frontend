import React, { useState } from 'react'
import "./NavBar.css"
import logo from "../../assets/images/global/logoNav.png"
import { Link } from 'react-scroll';
import { NavLink } from 'react-router-dom';

const NavBar = ({showOptions}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
      <nav>
          <Link to={"login"} smooth={true} offset={-110} duration={500} className='title'>
              <img src={logo} alt='' className='logo'></img>
          </Link>

          <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
              <span></span>
              <span></span>
              <span></span>
          </div>

          {showOptions ? 
            <ul className={menuOpen ? "open" : ""}>
                <li>
                    <Link to={"aboutUs"} smooth={true} offset={-100} duration={500}>
                        ¿Quienes somos?
                    </Link>
                </li>

                <li>
                    <Link to={"team"} smooth={true} offset={-60} duration={500}>
                        Equipo
                    </Link>
                </li>

                <li>
                    <NavLink to="/experiences">Experiencias significativas</NavLink>
                </li>
            </ul> : <></>
          }
      </nav>
    )
}

export default NavBar
