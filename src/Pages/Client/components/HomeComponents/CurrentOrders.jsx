import React, { lazy, Suspense, useEffect, useState } from "react";
import ComponentLoading from "../../../../components/ComponentLoading";

const CurrentOrder = lazy(() => import("./CurrentOrder"));

const CurrentOrders = (props) => {
    const { sendOverlayClass, user, orderUpdated } = props; // Añadido orderUpdated
    const [OrderId, setOrderId] = useState("");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleOrderId = (value) => {
        sendOverlayClass(value);
        setOrderId(value);
    };

    const fetchOrders = async () => {
        try {
            const response = await fetch(`http://localhost:3000/ClientCurrentOrders/${user.id}`);
            const data = await response.json();

            if (Array.isArray(data)) {
                setOrders(data);
            } else {
                throw new Error("Los datos no son un arreglo");
            }
        } catch (error) {
            console.error("Error al obtener las órdenes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [user.id]);

    useEffect(() => {
        if (orderUpdated) {
            fetchOrders();
        }
    }, [orderUpdated]);

    if (loading) {
        return (
            <div className="current-orders">
                <h1>Pedidos Actuales</h1>
                <ComponentLoading />
            </div>
        );
    }

    const OrderList = orders.map((order) => (
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
            {OrderList.length !== 0 ? OrderList : <h2>Usted no tiene pedidos pendientes</h2>}
        </div>
    );
};

export default CurrentOrders;
