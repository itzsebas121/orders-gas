import React from 'react'
function CurrentOrder(props) {
    const {onSendValue, OrderId, Status, Price} = props

    const sendOrderId =()=>{
        onSendValue(OrderId)
    }
    return (
        <div className='current-order'>
            <div className="card">
                <div>
                <strong>Id pedido: </strong>{OrderId}<br />
                <strong>Estado: </strong> {Status} <br />
                <strong>Valor: </strong> {Price}
                </div>
                <button onClick={sendOrderId}>Ver pedido</button>
            </div>
        </div>
    );
}
export default CurrentOrder;