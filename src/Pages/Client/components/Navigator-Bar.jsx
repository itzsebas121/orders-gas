import React from "react";
import HeaderUber from '/src/components/HeaderUber'
import './Navigator-bar.css'
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const NavigatorBar = () => {
    const isActive = (path) =>location.pathname === path;

    return (
        <nav className="navigator-bar">

            <HeaderUber />
            <div className="items-nav">
                <ul>
                    <li>
                    
                        <NavLink to={"/Client/Home"} className={`${isActive('/Client/Home') ? 'item active' : 'item'}`} ><p><FontAwesomeIcon icon={faHome} />Inicio</p></NavLink>
                    </li>
                    <li>
                        <NavLink to={"/Client/Record"} className={isActive('/Client/Record') ? 'item active' : 'item'} > <p ><FontAwesomeIcon icon={faClockRotateLeft} />Historial</p> </NavLink>

                    </li>
                </ul>
                <ul>
                    <li>
                        <NavLink to={"/Client/Profile"} className={isActive('/Client/Profile') ? 'item active' : 'item'}><p><FontAwesomeIcon icon={faUser}/>Perfil</p></NavLink>
                    </li>

                </ul>
            </div>
        </nav>
    );
};
export default NavigatorBar;