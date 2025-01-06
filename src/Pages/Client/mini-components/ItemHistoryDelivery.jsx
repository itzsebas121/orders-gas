import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faClock, faCheck, faFire, faTruck, faWarning } from "@fortawesome/free-solid-svg-icons";
const ItemHistoryDelivery = (props) => {
    const { status, date } = props;
    return (
        <div className="item-history">
            {status === "Pendiente" && <FontAwesomeIcon icon={faClock}  />}
            {status === "En Camino" && <FontAwesomeIcon icon={faTruck}  />}
            {status === "Entregado" && <FontAwesomeIcon icon={faCheck} style={{ color: "#008000" }} />} 
            {status === "Cancelado" && <FontAwesomeIcon icon={faWarning} style={{ color: "#f00000" }} />} 

            <div className="detail-item-history">
                <h3>{status}</h3>
                <p>{date}</p>
            </div>
        </div>
    );
}
export default ItemHistoryDelivery;