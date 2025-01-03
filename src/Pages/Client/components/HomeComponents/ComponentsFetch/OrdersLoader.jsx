import React, { useState, useEffect } from "react";
import fetchOrders from './fetchOrder';
import CurrentOrder from "../CurrentOrder";
const OrdersLoader = () => {
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        fetchOrders()
            .then(data => {
                setOrders(data);
            })
            .catch(error => {
                console.error("Error al obtener las órdenes:", error);
            });
    }, []);

    if (orders === null) {
        return <div>Cargando...</div>;
    }

    const OrderList = orders.map(order => (
        <CurrentOrder
            key={order.OrderID}
            onSendValue={handleOrderId}
            OrderId={order.OrderID}
            Status={order.OrderStatus}
            Price={order.Price}
            location={order.Location}
        />
    ));

    return (
        <div className="current-orders">
            <h1>Pedidos Actuales</h1>
            {OrderList}
        </div>
    );
}

export default OrdersLoader;
