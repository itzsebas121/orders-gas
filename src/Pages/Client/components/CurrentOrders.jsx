import React, { useState } from "react";
import './styles.css'
import CurrentOrder from "./CurrentOrder";


const CurrentOrders = () => {
    const [OrderId, setOrderId] = useState("");
    const handleOrderId = (value) => {
        setOrderId(value)
        alert(value)
    }
    const orders = [{OrderId:1, Status:"En transito", Price:3.5},{OrderId:15, Status:"Aceptado", Price:7.00}]
    const OrderList = orders.map(order => <CurrentOrder key={order.OrderId} onSendValue={handleOrderId} OrderId={order.OrderId} Status={order.Status} Price={order.Price} />)
    return (
        <div className="current-orders">
            
            Pedidos Actuales
            {OrderList}

        </div>
    );
}
export default CurrentOrders;   