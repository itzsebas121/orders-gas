import React, { useState } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:8080');

const ItemCurrentOrder = (props) => {
    const { order, onSendValue } = props;
    const [locationCurrent, setLocationCurrent] = useState("");

    const getLocation = (callback) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const aux = position.coords.latitude + ", " + position.coords.longitude;
                    setLocationCurrent(aux); 
                    callback(aux); 
                },
                (error) => {
                    console.error("Error al obtener ubicación:", error.message);
                },
                {
                    enableHighAccuracy: true,
                }
            );
        } else {
            alert("Geolocalización no está disponible en este navegador.");
        }
    };

    

    const handleCancel = () => {
        fetch(`http://localhost:3000/CancelOrder`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                OrderID: order.OrderID,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
                socket.emit("CancelOrder", {
                    OrderID: order.OrderID,
                    message: `La orden ${order.OrderID} ha sido cancelada.`,
                });
            })
            .catch((error) => {
                console.error("Error al cancelar la orden:", error);
            });
    };

    const handleDelivered = () => {
        fetch(`http://localhost:3000/DeliveredOrder`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                OrderID: order.OrderID,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
                socket.emit("OrderDelivered", {
                    OrderID: order.OrderID,
                    message: `La orden ${order.OrderID} ha sido entregada.`,
                });
            })
            .catch((error) => {
                console.error("Error al marcar como entregada:", error);
            });
    };

    return (
        <div className="item-new-order">
            <div className="container-item">
                <div className="name-item">
                    <h2>{order.Name} {order.LastName}</h2>
                </div>
                {order.OrderStatus === "En Camino" && (
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
                    <button onClick={() => onSendValue(order.OrderID)}>Ver</button>
                    <button className="btn-entregado" onClick={handleDelivered}>
                        Entregado
                    </button>
                    <button className="btn-cancelar" onClick={handleCancel}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemCurrentOrder;
