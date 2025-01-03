import React from 'react'
import './styles.css'
function CurrentOrder(props) {
    const { onSendValue, OrderId, Status, location, Price } = props

    const sendOrderId = () => {
        onSendValue(OrderId)
    }
    return (
        <div className='current-order'>
            <div className="card-content">
                <div className="card-header-order">
                    <p><b>Id pedido:</b> {OrderId} </p>
                    {Status === 'Pendiente' && <p className='parrafo p-pendiente'>{Status} </p>}
                    {Status === 'En Camino' && <p className='parrafo p-en-camino'>{Status} </p>}
                </div>

                <p><b>Lugar de entrega:</b> </p> {location} <br />
                <p><b>Total:</b> </p> {Price}
            </div>
            <button onClick={sendOrderId} className="btn">Ver pedido</button>
        </div>
    );
}
export default CurrentOrder;