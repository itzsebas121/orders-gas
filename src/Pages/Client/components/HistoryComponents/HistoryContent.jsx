import React, { useEffect, useState } from "react";
import './styles.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import HistoryItem from "./HistoryItem";
const HistoryContent = () => {

    const [OrdersHistory, setOrdersHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/ClientHistoryOrders/${1}`)
            .then(response => response.json())
            .then(data => {
                setOrdersHistory(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error al obtener los detalles del pedido:', error);
                setIsLoading(false);
            });
    }, []);
    if (isLoading) {
        return <div>Cargando...</div>;
    }

    const OrderList = OrdersHistory.map((item, index) => (

        <HistoryItem key={item.OrderID} id={item.OrderID}
        status={item.OrderStatus}
        date={item.OrderDate}
        detail_order={item.OrderDetails}
        location={item.Location} total={item.OrderTotal} />
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