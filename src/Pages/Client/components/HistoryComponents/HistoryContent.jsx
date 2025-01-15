import React, { useEffect, useState } from "react";
import './styles.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import HistoryItem from "./HistoryItem";
const HistoryContent = (props) => {
    const { Client, sendOverlayClass } = props;
    const [OrdersHistory, setOrdersHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [OrderId, setOrderId] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3000/ClientHistoryOrders/${Client.id}`)
            .then(response => response.json())
            .then(data => {
                setOrdersHistory(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error al obtener los detalles del pedido:', error);
                setIsLoading(false);
            });
    }, [Client]);

    const handleOrderId = (value) => {
        sendOverlayClass(value);
        setOrderId(value);
    };

    const OrderList = OrdersHistory.map((item, index) => (

        <HistoryItem
            key={item.OrderID}
            id={item.OrderID}
            status={item.OrderStatus}
            date={item.OrderDate}
            detail_order={item.OrderDetails}
            location={item.Location}
            total={item.OrderTotal}
            onSendValue={handleOrderId} />
    ))
    return (
        <div className="history-content">
            <div className="search-history">
                <div className="input-search">
                    <input type="text" placeholder="Buscar pedido por id" />
                    <FontAwesomeIcon icon={faSearch} className="icon-search" />
                </div>
                <div className="cmb-search-container">
                    <select name="cmb-search" id="cmb-search">
                        <option value="">Todos</option>
                        <option value="">Enviado</option>
                        <option value="">Recibido</option>
                        <option value="">Cancelado</option>
                    </select>
                </div>
            </div>
            <div className="items-history">
                {OrderList}
            </div>
        </div>
    );
}
export default HistoryContent;