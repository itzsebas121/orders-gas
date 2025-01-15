import React, { useState, useEffect, useRef } from 'react'
import ItemNewOrder from './ItemNewOrder'
import Loading from "../../../../components/Loading"
import io from 'socket.io-client';
const socket = io('http://localhost:8080');
const NewOrdersDist = (props) => {
    const { user } = props;
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const distributor = useRef(null)
    const hasMounted = useRef(false);

    const getNewOrders = async () => {
        setLoading(true); 
        try {
            const response = await fetch('http://localhost:3000/getNewOrders');
            const data = await response.json();
            setOrders(data);
            setLoading(false);
            distributor.current = user;
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!hasMounted.current) {
            getNewOrders();
            socket.on('receiveMessageFromOtherClient', (message) => {
                alert('Nuevo pedido cerca de ti en: ' + message.nameLocation);
                getNewOrders();
            });
            socket.on('AgreeOrder', (message) => {
                alert(message)
                getNewOrders();
            });
        }
        return () => {
            socket.off('receiveMessageFromOtherClient');
            socket.off('AgreeOrder');
        };
    }, [user]);
    if (loading) {
        return <Loading />
    }
    const OrdersList = orders.map((order, index) => {
        return (
            <ItemNewOrder key={index} order={order} user={distributor.current} />
        )
    })
    return (
        <div className="current-orders-container">
            {OrdersList}
        </div>
    )
}
export default NewOrdersDist