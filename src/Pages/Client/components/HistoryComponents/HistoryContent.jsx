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
    const [searchTerm, setSearchTerm] = useState("");  // Filtro por ID
    const [filterStatus, setFilterStatus] = useState("");  // Filtro por estado

    // Obtener el historial de pedidos
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

    const filteredOrders = OrdersHistory.filter(item => {
        const matchesSearchTerm = item.OrderID.toString().includes(searchTerm); 
        const matchesStatus = filterStatus ? item.OrderStatus === filterStatus : true;  // Filtro por estado

        return matchesSearchTerm && matchesStatus;
    });

    const OrderList = filteredOrders.map((item, index) => (
        <HistoryItem
            key={item.OrderID}
            id={item.OrderID}
            status={item.OrderStatus}
            date={item.OrderDate}
            detail_order={item.OrderDetails}
            location={item.Location}
            total={item.OrderTotal}
            onSendValue={handleOrderId}
        />
    ));

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleStatusChange = (event) => {
        setFilterStatus(event.target.value);
    };

    return (
        <div className="history-content">
            <div className="search-history">
                <div className="input-search">
                    <input
                        type="text"
                        placeholder="Buscar pedido por id"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <FontAwesomeIcon icon={faSearch} className="icon-search" />
                </div>
                <div className="cmb-search-container">
                    <select
                        name="cmb-search"
                        id="cmb-search"
                        value={filterStatus}
                        onChange={handleStatusChange}
                    >
                        <option value="">Todos</option>
                        <option value="Entregado">Entregado</option>
                        <option value="En Camino">En Camino</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Cancelado">Cancelado</option>
                    </select>
                </div>
            </div>
            <div className="items-history">
                {isLoading ? <p>Loading...</p> : OrderList}
            </div>
        </div>
    );
};

export default HistoryContent;
