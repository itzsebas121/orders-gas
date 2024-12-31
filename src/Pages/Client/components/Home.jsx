import React, { useState } from "react";
import CurrentOrders from "./CurrentOrders";
import NewOrder from "./NewOrder";
import './Home.css'
import DetailOrder from "./DetailOrder";
const Home = () => {
    const [OrderId, setOrderId] = useState("");
    const [overlay, sendOverlay] = useState(false);
    const handleOverlay = (value) => {
        sendOverlay(true)
        setOrderId(value)
    }
    const hiddenOverlay = (value) => {
        sendOverlay(value)
    }
    return (
        <div className="home">
            <NewOrder></NewOrder>
            <CurrentOrders sendOverlayClass={handleOverlay}></CurrentOrders>
            {overlay && <DetailOrder OrderId={OrderId} hidden={hiddenOverlay}></DetailOrder>}
        </div>
    );
}
export default Home;