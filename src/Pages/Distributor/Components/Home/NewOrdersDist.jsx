import React,{useState, useEffect} from 'react'
import ItemNewOrder from './ItemNewOrder'
import Loading from "../../../../components/Loading"
const NewOrdersDist = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    /* const orders = [
        {
            name: "Sebas Tipan",
            items: [
                { item: "2 x Gas Domestico" },
            ],
            total: 45,
            location: "Pendiente"
        }, 
        {
            name: "Juan Lopez",
            items: [
                { item: "2 x Gas Domestico" },
            ],
            total: 45,
            location: "Pendiente"
        }, 
    ]
 */
    
    useEffect(() => {
        fetch('http://localhost:3000/getNewOrders')
            .then(response => response.json())
            .then(data => {
                setOrders(data)
                console.log(data)
                setLoading(false)
            })
            .catch(error => console.error(error));
    }, [])
    if (loading) {
        return <Loading />
    }
    const OrdersList = orders.map((order, index) => {
        return (
            <ItemNewOrder key={index} order={order} />
        )
    })
    return (
        <div className="current-orders-container">
            {OrdersList}
        </div>
    )
}
export default NewOrdersDist