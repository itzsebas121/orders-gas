import React from "react";
import HeaderUber from '/src/components/HeaderUber'
import './Navigator-bar.css'
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";

import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "./Auth";
const NavigatorBar = (props) => {
    const { Home, History } = props;
    const { logout } = useAuth();
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navigator-bar">
            <FontAwesomeIcon icon={faBars} className="icon-menu-bar" onClick={() => document.querySelector('.navigator-bar').classList.remove('active')} />
            <HeaderUber />
            <div className="items-nav">
                <ul>
                    <li>

                        <NavLink to={Home} className={`${isActive({Home}) ? 'item active' : 'item'}`} ><p><FontAwesomeIcon icon={faHome} />Inicio</p></NavLink>
                    </li>
                    <li>
                        <NavLink to={History} className={isActive(History) ? 'item active' : 'item'} > <p ><FontAwesomeIcon icon={faClockRotateLeft} />Historial</p> </NavLink>

                    </li>
                </ul>
                <ul>
                    <li>
                        <label onClick={logout} className="item"><p><FontAwesomeIcon icon={faDoorOpen} />Cerrar Sesión</p></label>
                    </li>

                </ul>
            </div>
        </nav>
    );
};
export default NavigatorBar;