import { faPersonDigging } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

import React from "react";
const ItemCurrentOrder = (props) => {
    const { order } = props
    return (
        <div className="item-current-order">
            <h4>{order.nameClient}</h4>
            <div className="detail-order">
                <p>
                    {order.items.map((element, index) => {
                        return (`${element.item}, `);
                    })}
                ...</p>
                <p><b>Total: </b>$ {order.total}</p>
            </div>
            {order.state === 'Pendiente' && <p className="parrafo current-order-pendiente">{order.state}</p>}
            <div className="buttons-order">
                <button>Ver</button>
                <button className="btn-entregado">Entregado</button>
                <button className="btn-cancelar" >Cancelar</button>
            </div>
        </div>
    );
}
export default ItemCurrentOrder;