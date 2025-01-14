import React from "react";
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const ItemCurrentOrder = (props) => {
    const { order } = props
    const handleWhatsapp =()=>{
        alert(order.PhoneNumber)
    }
    const handleView =()=>{
        alert("Logica para ver el pedido")
    }
    const handleCancel =()=>{
        alert("Logica para cancelar el pedido")
    }
    const handleDelivered =()=>{
        alert("Logica para marcar el pedido como entregado")
    }
    return (
        <div className="item-new-order">
            <div className="container-item">
                <div className="name-item">
                    <h2>{order.Name} {order.LastName}</h2>
                    <FontAwesomeIcon icon={faWhatsapp} size="2x" onClick={handleWhatsapp} />
                </div>
                <div className="order-items">
                    {order.OrderDetails.map((item, index) => (
                        <p key={index} className="item">
                            {item.Quantity} x {item.TypeCylinder}
                        </p>
                    ))}
                </div>

                <p className="total">Total: <span>${order.Total}</span></p>
                {order.OrderStatus === 'En Camino' && (
                    <p className="parrafo p-en-camino">{order.OrderStatus}</p>
                )}
                <div className="buttons-order">
                    <button onClick={handleView}>Ver</button>
                    <button className="btn-entregado" onClick={handleDelivered}>Entregado</button>
                    <button className="btn-cancelar" onClick={handleCancel}>Cancelar</button>
                </div>
            </div>
        </div>

    );
}
export default ItemCurrentOrder;