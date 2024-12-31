import React, { useState, lazy, Suspense } from "react";
import './Home.css'
const DetailOrder = lazy(() => import("./DetailOrder"));
const CurrentOrders = lazy(() => import("./CurrentOrders"));
const NewOrder = lazy(() => import("./NewOrder"));
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
        <Suspense>
        <div className="home">
            <NewOrder></NewOrder>
            <CurrentOrders sendOverlayClass={handleOverlay}></CurrentOrders>
            {overlay && <DetailOrder OrderId={OrderId} hidden={hiddenOverlay}></DetailOrder>}
        </div>
        </Suspense>
    );
}
export default Home;