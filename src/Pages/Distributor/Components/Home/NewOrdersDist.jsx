import React from 'react'
import ItemNewOrder from './ItemNewOrder'
const NewOrdersDist = () => {
    const orders = [
        {
            name: "Sebas Tipan",
            items: [
                { item: "2 x Gas Domestico" }
            ],
            total: 45,
            location: "Pendiente"
        }]

        const OrdersList = orders.map((order, index) => {
            return (
                <ItemNewOrder key={index} order={order}/>
            )
        })
  return (
    <div className="current-orders-container">
        {OrdersList}
    </div>
  )
}
export default NewOrdersDist