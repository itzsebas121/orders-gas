import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faClock, faCheck, faFire, faTruck, faWarning } from "@fortawesome/free-solid-svg-icons";
const ItemHistoryDelivery = (props) => {
    const { status } = props;
    return (
        <div className="item-history">
            {status === "En proceso" && <FontAwesomeIcon icon={faClock}  />}
            {status === "Aceptado" && <FontAwesomeIcon icon={faFire} style={{ color: "#ffa500" }} />}
            {status === "En camino" && <FontAwesomeIcon icon={faTruck}  />}
            {status === "Entregado" && <FontAwesomeIcon icon={faCheck} style={{ color: "#008000" }} />} 
            {status === "Rechazado" && <FontAwesomeIcon icon={faWarning} style={{ color: "#f00000" }} />} 

            <div className="detail-item-history">
                <h3>{status}</h3>
                <p>30/12/2024 14:30</p>
            </div>
        </div>
    );
}
export default ItemHistoryDelivery;