import React from 'react'
import './styles.css'
import { colors } from '@mui/material';
import { alignProperty } from '@mui/material/styles/cssUtils';
const HistoryItem = (props) => {
    const { id, status, date, detail_order, location, total } = props;
    const dateFormat = new Date(date).toLocaleDateString();
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
                <p className="date">Fecha: {dateFormat}</p>
                <p className="section-title"><b>Tanques:</b></p>
                {detail_order.map((item, index) => (

                    index < 2
                        ? <p key={index} className="product">{item.Quantity} x {item.TypeCylinder}</p>
                        : index == 2 && <p> ...</p>
                ))}
                <p className="address"><b>Direccion: </b>{location}</p>
                <p className="total" style={{ textAlign: 'center' }}><b>Total: </b>${total}</p>
                <button >Ver detalles</button>
            </div>
        </div>
    );
}
export default HistoryItem;