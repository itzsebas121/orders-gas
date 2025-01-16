import React, { useState, useEffect } from "react";
import "./styles.css";

const HistoryDistributor = (props) => {
    const { user } = props;
    const [history, setHistory] = useState([]);
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3000/distributorHistory/${user.id}`)
            .then((response) => response.json())
            .then((data) => {
                setHistory(data);
                setFilteredHistory(data);
            })
            .catch((error) => console.error("Error fetching data: ", error));
    }, [user.id]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatusFilter(e.target.value);
    };

    useEffect(() => {
        // Filtrado por búsqueda e estado
        const filtered = history.filter((item) => {
            const matchesSearch = item.OrderID.toString().includes(searchTerm);
            const matchesStatus =
                statusFilter === "" || item.OrderStatus === statusFilter;
            return matchesSearch && matchesStatus;
        });
        setFilteredHistory(filtered);
    }, [searchTerm, statusFilter, history]);

    return (
        <div className="history">
            <h1 className="history-title">Historial del Distribuidor</h1>

            <div className="filters">
                <div className="filter-search">
                    <input
                        type="text"
                        placeholder="Buscar por ID de Pedido"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                </div>
                <div className="filter-status">
                    <select
                        value={statusFilter}
                        onChange={handleStatusChange}
                        className="status-select"
                    >
                        <option value="">Todos</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="En Camino">En Camino</option>
                        <option value="Entregado">Entregado</option>
                        <option value="Cancelado">Cancelado</option>
                    </select>
                </div>
            </div>

            <div className="history-table">
                {filteredHistory.length === 0 ? (
                    <p>No se encontraron pedidos</p>
                ) : (
                    <div className="table-distributor">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID de Pedido</th>
                                    <th>Estado</th>
                                    <th>Fecha</th>
                                    <th>Ubicación</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredHistory.map((order) => (
                                    <tr key={order.OrderID}>
                                        <td>{order.OrderID}</td>
                                        <td className={`status ${order.OrderStatus}`}>
                                            {order.OrderStatus}
                                        </td>
                                        <td>{new Date(order.OrderDate).toLocaleDateString()}</td>
                                        <td>{order.LocationName}</td>
                                        <td>${order.OrderTotal}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryDistributor;
