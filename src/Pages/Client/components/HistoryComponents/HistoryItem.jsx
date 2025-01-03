import React from 'react'
import './styles.css'
import { colors } from '@mui/material';
const HistoryItem = (props) => {
    const { id, status, date, detail_order, location, total} = props;

    return (
        <div className="card-history">
            <div className="card-header">
                <h3>Pedido {id}</h3>
                {status == 'Entregado' && (<p className='entregado'> {status}</p>)}
                {status == 'En Camino' && (<p className='en-camino'> {status}</p>)}
                {status == 'Pendiente' && (<p className='pendiente'> {status}</p>)}
                {status == 'Cancelado' && (<p className='cancelado'> {status}</p>)}
            </div>
            <div className="card-body styled-card">
                <p className="date">Fecha: {date}</p>
                <p className="section-title"><b>Tanques:</b></p>
                {detail_order.map((item, index) => (
                    <p key={index} className="product">{item.cantidad} x {item.producto}</p>
                ))}
                <p className="address"><b>Direccion: </b>{location}</p>
                <p className="total"><b>Total: </b>${total}</p>
            </div>
        </div>
    );
}
export default HistoryItem;