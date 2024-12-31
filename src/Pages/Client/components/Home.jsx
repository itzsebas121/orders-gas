import React, { useState, lazy, Suspense } from "react";
import './Home.css'
import './styles.css'
const DetailOrder = lazy(() => import("./HomeComponents/DetailOrder"));
const CurrentOrders = lazy(() => import("./HomeComponents/CurrentOrders"));
const NewOrder = lazy(() => import("./HomeComponents/NewOrder"));
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