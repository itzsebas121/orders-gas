import React, { useState, useEffect, useRef } from "react";
import ItemCurrentOrder from "./ItemCurrentOrder";
import Loading from "../../../../components/Loading"
import { use } from "react";
import io from 'socket.io-client';
const socket = io('http://localhost:8080');
const CurrentOrdersDistributor = (props) => {
    const { user, sendOverlayClass } = props;
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const hasMounted = useRef(false);
    const [distributor, setDistributor] = useState([]);
    const [OrderId, setOrderId] = useState("");

    const handleOrderId = (value) => {
        sendOverlayClass(value);
        setOrderId(value);
    };
    const getCurrentOrder = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/GetCurrentOrdersDistributor/${user.id}`);
            const data = await response.json();
            setOrders(data);
            setLoading(false);
            setDistributor(user);
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    }
    useEffect(() => {
        if (user.id) {
            if (!hasMounted.current) {
                hasMounted.current = true;
                getCurrentOrder();
            }
        }
        socket.on('AgreeOrder', (message) => {
            if (user.id == message.DistributorID) {
                getCurrentOrder()
            }
        });
        return () => {
            socket.off('AgreeOrder');
        };
    }, [user.id]);

    if (loading) {
        return <Loading />;
    }   

    const orderlist = orders.map((element, index) => {
        return (
            <ItemCurrentOrder
                order={element}
                key={index}
                onSendValue={handleOrderId}
            />
        );
    });

    return (
        <div className="current-orders-container">
            {orders.length !== 0 ? orderlist : <h1>Usted no tiene pedidos pendientes de entrega</h1>}
        </div>
    );
};


export default CurrentOrdersDistributor;