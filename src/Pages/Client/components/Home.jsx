import React, { useState, lazy, Suspense } from "react";
import './styles.css'
import { useEffect } from "react";
import Loading from "../../../components/Loading";
const DetailOrder = lazy(() => import("./HomeComponents/DetailOrder"));
const CurrentOrders = lazy(() => import("./HomeComponents/CurrentOrders"));
const NewOrder = lazy(() => import("./HomeComponents/NewOrder"));
import { useAuth } from "../../../components/Auth";
const Home = () => {
    const { verifyToken } = useAuth();
    const [OrderId, setOrderId] = useState("");
    const [overlay, sendOverlay] = useState(false);
    
    useEffect(() => {
        verifyToken()
    })

    const handleOverlay = (value) => {
        sendOverlay(true)
        setOrderId(value)
    }
    const hiddenOverlay = (value) => {
        sendOverlay(value)
    }
    return (
        <Suspense fallback={<Loading></Loading>}>
            <div className="home">
                <NewOrder></NewOrder>
                <CurrentOrders sendOverlayClass={handleOverlay}></CurrentOrders>
                {overlay && <DetailOrder OrderId={OrderId} hidden={hiddenOverlay}></DetailOrder>}
            </div>
        </Suspense>
    );
}
export default Home;