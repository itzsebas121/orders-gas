import React, { useState } from "react";
import CurrentOrder from "./CurrentOrder";


const CurrentOrders = (props) => {
    const {sendOverlayClass} = props
    const [OrderId, setOrderId] = useState("");
    const handleOrderId = (value) => {
        sendOverlayClass(value)
        setOrderId(value);
    }
    const orders = [
        {OrderId:1, Status:"En transito", Price:3.5},
        {OrderId:15, Status:"Aceptado", Price:7.00},
        {OrderId:17, Status:"Aceptado", Price:7.00},
        {OrderId:29, Status:"Aceptado", Price:7.00},
        {OrderId:42, Status:"Aceptado", Price:7.00}
    ]
    const OrderList = orders.map(order => <CurrentOrder key={order.OrderId} onSendValue={handleOrderId} OrderId={order.OrderId} Status={order.Status} Price={order.Price} />)
    return (
        <div className="current-orders">
            
            <h1>Pedidos Actuales</h1>
            {OrderList}

        </div>
    );
}
export default CurrentOrders;   