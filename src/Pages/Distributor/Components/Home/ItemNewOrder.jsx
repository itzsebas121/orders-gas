import React, { useState } from 'react'
import io from 'socket.io-client';
const socket = io('http://localhost:8080');

const ItemNewOrder = (props) => {
    const { order, user } = props
    const [locationCurrent, setLocationCurrent] = useState("")
    const handleSubmit = () => {
        getLocation((currentLocation) => {
            const orderAcept = {
                "OrderID":order.OrderID, 
                "DistributorID":user.id, 
                "Location_Current":currentLocation 
            }
            fetch('http://localhost:3000/AceptOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderAcept)
            })
                .then(response => response.json())
                .then(data => {
                    socket.emit('AgreeOrder', orderAcept);
                })
                .catch(error => console.error(error));
        });
    };

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


    return (
        <div className="item-new-order">
            <div className="container-item">
                <div className="name-item">
                    <h2>{order.Name} {order.LastName}</h2>
                </div>
                <div className="order-items">
                    {order.OrderDetails.map((item, index) => (
                        <p key={index} className="item">
                            {item.Quantity} x {item.TypeCylinder}
                        </p>
                    ))}
                </div>
                <p className="total">Total: <span>${order.Total}</span></p>
                <p className="location">Dirección: <span>{order.LocationName}</span></p>
                <div className="buttons-new-orders">
                    <button onClick={handleSubmit}>Aceptar pedido</button>
                </div>
            </div>

        </div>
    )
}
export default ItemNewOrder