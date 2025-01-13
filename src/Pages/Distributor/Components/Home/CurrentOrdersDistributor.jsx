import React from "react";
import ItemCurrentOrder from "./ItemCurrentOrder";

const CurrentOrdersDistributor = () => {
    const orders = [
        {
            nameClient: "Sebas Tipan",
            items: [
                { item: "2 x Gas Domestico" }
            ],
            total: 45,
            state: "Pendiente"
        },
        {
            nameClient: "Carlos Mendoza",
            items: [
                { item: "1 x Gas Domestico" },
                { item: "3 x Gas Industrial" }
            ],
            total: 35,
            state: "Completado"
        },
        {
            nameClient: "Ana Gómez",
            items: [
                { item: "5 x Gas Domestico" },
                { item: "2 x Gas Industrial" }
            ],
            total: 50,
            state: "Pendiente"
        },
        {
            nameClient: "Luis Fernández",
            items: [
                { item: "6 x Gas Domestico" },
                { item: "1 x Gas Industrial" }
            ],
            total: 60,
            state: "Completado"
        },
        {
            nameClient: "Pedro Ruiz",
            items: [
                { item: "3 x Gas Domestico" },
                { item: "4 x Gas Industrial" }
            ],
            total: 55,
            state: "Pendiente"
        }
    ];

    const orderlist = orders.map((element, index) => {
        return (
            < ItemCurrentOrder order={element} key={index} />);
    })
    return (
        <div className="current-orders-container">
            {orders.length != 0 ? orderlist : <h1>Usted no tiene pedidos pendientes de entrega</h1>}
        </div>
    );
}
export default CurrentOrdersDistributor;