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
                    <label><b>Id pedido:</b> {OrderId} </label>
                    {Status === 'Pendiente' && <p className='parrafo p-pendiente'>{Status} </p>}
                    {Status === 'En Camino' && <p className='parrafo p-en-camino'>{Status} </p>}
                </div>

                <label><b>Lugar de entrega:</b> </label> {location} <br />
                <label><b>Total:</b> </label>$ {Price}
            </div>
            <button onClick={sendOrderId} className="btn">Ver pedido</button>
        </div>
    );
}
export default CurrentOrder;