import React, { useEffect, useState, useRef } from 'react'
import ComponentLoading from '../../../components/ComponentLoading';
import io from 'socket.io-client';
const socket = io('http://localhost:8080'); 
const NewOrder = (props) => {
    const { newOrder, OrderDetail, hidden } = props;
    const [loading, setLoading] = useState(true);
    const hasMounted = useRef(false);

    useEffect(() => {

        if (!hasMounted.current) {
            hasMounted.current = true;
            fetch(`http://localhost:3000/createOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newOrder),
            })
                .then(response => response.json())
                .then(data => {
                    const newOrderId = data[0].NewOrderID;
                    OrderDetail.forEach(element => {
                        element.OrderID = newOrderId;
                        fetch(`http://localhost:3000/InsertDetails/${newOrderId}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(element),
                        })
                            .then(response => response.json())
                            .then(dataDetail => {
                               //AQUI DEBO AGREGAR LA LOGICA PARA QUE APAREZACA EL MODAL
                               socket.emit('sendMessageToOtherClient', newOrder);
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });
                    });
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, []);
    const hiddenOverlay = () => {
        hidden(false);
    }
    if (loading) {
        return (
            <div className="overlay active">
                <ComponentLoading />
            </div>
        );
    }
    return (
        <div className="overlay active">
            <button onClick={hiddenOverlay}>Cerrar</button>
        </div>
    );
}
export default NewOrder