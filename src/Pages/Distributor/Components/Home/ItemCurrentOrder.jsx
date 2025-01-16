import React, { useState } from "react";
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DetailOrder from "../../../Client/components/HomeComponents/DetailOrder";
const ItemCurrentOrder = (props) => {
    const { order, onSendValue } = props;
    const [overlay, sendOverlay] = useState(false);

    const hiddenOverlay = (value) => {
        sendOverlay(value);
    };

    const sendOrderId = () => {
        onSendValue(order.OrderID);
    };

    const handleWhatsapp = () => {
        alert(order.PhoneNumber);
    };

    const handleCancel = () => {
        fetch(
            `http://localhost:3000/CancelOrder`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    OrderID: order.OrderID,
                })
            }
        ).then(response => response.json()).then(data => alert(data.message))
    };
    const handleDelivered = () => {
        fetch(
            `http://localhost:3000/DeliveredOrder`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    OrderID: order.OrderID,
                })
            }
        ).then(response => response.json()).then(data => alert(data.message))
    };

    return (
        <div className="item-new-order">
            <div className="container-item">
                <div className="name-item">
                    <h2>{order.Name} {order.LastName}</h2>
                    <FontAwesomeIcon icon={faWhatsapp} size="2x" onClick={handleWhatsapp} />
                </div>
                {order.OrderStatus === 'En Camino' && (
                    <p className="parrafo p-en-camino">{order.OrderStatus}</p>
                )}
                <div className="order-items">
                    {order.OrderDetails.map((item, index) => (
                        <p key={index} className="item">
                            {item.Quantity} x {item.TypeCylinder}
                        </p>
                    ))}
                </div>

                <p className="total">Total: <span>${order.Total}</span></p>

                <div className="buttons-order">
                    <button onClick={sendOrderId}>Ver</button>
                    <button className="btn-entregado" onClick={handleDelivered}>Entregado</button>
                    <button className="btn-cancelar" onClick={handleCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default ItemCurrentOrder;
