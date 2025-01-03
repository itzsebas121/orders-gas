import React from "react";
import './styles.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import HistoryItem from "./HistoryItem";
const HistoryContent = () => {
    const history = [
        {
            id: 1,
            status: 'Entregado',
            date: '2023-06-01',
            detail_order: [{ cantidad: 2, producto: 'Gas Domestico' }, { cantidad: 2, producto: 'Gas Industrial' }],
            location: 'Calle 123, Ciudad, País',
            total: 100.00
        },
        {
            id: 2,
            status: 'En Camino',
            date: '2023-05-25',
            detail_order: [{ cantidad: 2, producto: 'Gas Domestico' }, { cantidad: 2, producto: 'Gas Industrial' }],
            location: 'Calle 456, Ciudad, País',
            total: 150.00
        },
        {
            id: 3,
            status: 'Cancelado',
            date: '2023-05-25',
            detail_order: [{ cantidad: 2, producto: 'Gas Domestico' }, { cantidad: 2, producto: 'Gas Industrial' }],
            location: 'Calle 456, Ciudad, País',
            total: 130.00
        },{
            id: 4,
            status: 'Pendiente',
            date: '2023-05-25',
            detail_order: [{ cantidad: 2, producto: 'Gas Domestico' }, { cantidad: 2, producto: 'Gas Industrial' }],
            location: 'Calle 456, Ciudad, País',
            total: 130.00
        }
    ]
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
                {
                    history.map((item, index) => (
                        <HistoryItem key={item.id} id={item.id} 
                        status={item.status} 
                        date={item.date} 
                        detail_order={item.detail_order} 
                        location={item.location} total={item.total} />
                    ))
                }
            </div>
        </div>
    );
}
export default HistoryContent;