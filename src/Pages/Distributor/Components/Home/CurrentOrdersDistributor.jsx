import React, { useState, useEffect, useRef } from "react";
import ItemCurrentOrder from "./ItemCurrentOrder";
import Loading from "../../../../components/Loading"
import { use } from "react";
const CurrentOrdersDistributor = (props) => {
    const { user } = props;
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const hasMounted = useRef(false);

    /*  const orders = [
        {
            nameClient: "Sebas Tipan",
            items: [
                { item: "2 x Gas Domestico" }
            ],
            total: 45,
            phoneNumber:"5939989898989898",
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
  */

    useEffect(() => {
        if (user.id) {
            if (!hasMounted.current) {

                hasMounted.current = true;

                fetch(`http://localhost:3000/GetCurrentOrdersDistributor/${user.id}`)
                    .then(response => response.json())
                    .then(data => {
                        setOrders(data)
                        console.log(data)
                        setLoading(false)
                    })
                    .catch(error => console.error(error));
            }
        }
    }, [user.id]);

    if (loading) {
        return <Loading />
    }
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