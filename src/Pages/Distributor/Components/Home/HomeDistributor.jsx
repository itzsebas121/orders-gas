import React, { useEffect, useRef, useState } from 'react';
import Loading from '../../../../components/Loading';
import './styles.css'
import CurrentOrdersDistributor from './CurrentOrdersDistributor';
import NewOrdersDistributor from './NewOrdersDist';
import DetailOrder from '../../../Client/components/HomeComponents/DetailOrder';
const HomeDistributor = (props) => {
    const { user } = props;
    const [OrderId, setOrderId] = useState("");
    const [overlay, sendOverlay] = useState(false);
    
    const handleOverlay = (value) => {
        sendOverlay(true)
        setOrderId(value)
    }
    const hiddenOverlay = (value) => {
        sendOverlay(value)
    }
    const distributor = useRef(null);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        if (user && distributor.current !== user) {
            distributor.current = user;
            setLoading(false);
        }
    }, []);
    if (loading)
        return (<Loading />)
    return (
        <div className="home-distributor">
            <div className="currentOrders-distributor">
                <h2>Ordenes pendientes de entrega</h2>
                <CurrentOrdersDistributor user={distributor.current} sendOverlayClass={handleOverlay} />
            </div>
            <div className="new-orders-distributor">
                <h2>Nuevos pedidos</h2>
                <NewOrdersDistributor user={distributor.current} />
            </div>
            {overlay && <DetailOrder OrderId={OrderId} hidden={hiddenOverlay} ></DetailOrder>}

        </div>
    );
}

export default HomeDistributor;
