import React from 'react'
const ItemNewOrder = (props) => {
    const { order } = props
    return (
        <div className="item-new-order">
            <div className="container-item">
                <h2>{order.name}</h2>
                {order.items.map((item, index) => {
                    return (
                        <p key={index}>{item.item}</p>
                    )
                })}
                <p>Total: {order.total}</p>
                <p>Direccion: {order.location}</p>
            </div>
            <div className="buttons-new-orders">
                <button>Aceptar pedido</button>
            </div>
        </div>
    )
}
export default ItemNewOrder