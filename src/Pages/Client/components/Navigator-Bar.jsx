import React from "react";
import HeaderUber from '/src/components/HeaderUber'
import './Navigator-bar.css'
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../components/Auth";
const NavigatorBar = () => {
    const { logout } = useAuth();
    const isActive = (path) => location.pathname === path;
    
    return (
        <nav className="navigator-bar">

            <HeaderUber />
            <div className="items-nav">
                <ul>
                    <li>

                        <NavLink to={"/Client/Home"} className={`${isActive('/Client/Home') ? 'item active' : 'item'}`} ><p><FontAwesomeIcon icon={faHome} />Inicio</p></NavLink>
                    </li>
                    <li>
                        <NavLink to={"/Client/History"} className={isActive('/Client/History') ? 'item active' : 'item'} > <p ><FontAwesomeIcon icon={faClockRotateLeft} />Historial</p> </NavLink>

                    </li>
                </ul>
                <ul>
                    <li>
                        <NavLink to={"/Client/Profile"} className={isActive('/Client/Profile') ? 'item active' : 'item'}><p><FontAwesomeIcon icon={faUser} />Perfil</p></NavLink>
                        <label onClick={logout} className="item"><p><FontAwesomeIcon icon={faDoorOpen} />Cerrar Sesión</p></label>
                    </li>

                </ul>
            </div>
        </nav>
    );
};
export default NavigatorBar;