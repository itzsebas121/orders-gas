import React, { useState } from "react";
import './styles.css'
import { useEffect } from "react";
import DetailOrder from "./HomeComponents/DetailOrder";
import CurrentOrders from "./HomeComponents/CurrentOrders";
import NewOrder from "./HomeComponents/NewOrder";
const Home = (props) => {
    const { Client } = props
    const [OrderId, setOrderId] = useState("");
    const [overlay, sendOverlay] = useState(false);
    const [client, setClient] = useState([])
    useEffect(() => {
        setClient(Client)
    }, [Client])

    const handleOverlay = (value) => {
        sendOverlay(true)
        setOrderId(value)
    }
    const hiddenOverlay = (value) => {
        sendOverlay(value)
    }
    return (
        <div className="home">
            <NewOrder user={client}></NewOrder>
            <CurrentOrders sendOverlayClass={handleOverlay} user={client} ></CurrentOrders>
            {overlay && <DetailOrder OrderId={OrderId} hidden={hiddenOverlay} ></DetailOrder>}
        </div>
    );
}
export default Home;