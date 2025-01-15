import React, { lazy, Suspense, useEffect, useState } from "react";

import ComponentLoading from "../../../../components/ComponentLoading";


const CurrentOrder = lazy(() => import("./CurrentOrder"));

const CurrentOrders = (props) => {
    const { sendOverlayClass, user} = props;
    const [OrderId, setOrderId] = useState("");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleOrderId = (value) => {
        sendOverlayClass(value);
        setOrderId(value);
    };

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch(`http://localhost:3000/ClientCurrentOrders/${user.id}`);
            const data = await response.json();
        
            if (Array.isArray(data)) {
                return data;
            } else {
                throw new Error("Los datos no son un arreglo");
            }
        }
        fetchOrders()
            .then(data => {
                setOrders(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error al obtener las órdenes:", error);
                setLoading(false);
            });
    }, [user.id]);

    if (loading) {
        return (
            <div className="current-orders">
                <h1>Pedidos Actuales</h1>
                <ComponentLoading />
            </div>
        );
    }

    const OrderList = orders.map(order => (
        <CurrentOrder
            key={order.OrderID}
            onSendValue={handleOrderId}
            OrderId={order.OrderID}
            Status={order.OrderStatus}
            Price={order.Total}
            location={order.LocationName}
        />
    ));

    return (
        <div className="current-orders">
            <h1>Pedidos Actuales</h1>
            {OrderList.length != 0 ? OrderList : <h2>Usted no tiene pedidos pendientes</h2>}
        </div>
    );
}

export default CurrentOrders;
