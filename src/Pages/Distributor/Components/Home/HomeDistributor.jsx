import React, { useEffect, useRef } from 'react';
import Loading from '../../../../components/Loading';
import './styles.css'
import CurrentOrdersDistributor from './CurrentOrdersDistributor';
import NewOrdersDistributor from './NewOrdersDist';
const HomeDistributor = (props) => {
    const { user } = props;
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
                <CurrentOrdersDistributor user={distributor.current} /> 
            </div>
            <div className="new-orders-distributor">
                <h2>Nuevos pedidos</h2>
                <NewOrdersDistributor/>
            </div>
        </div>
    );
}

export default HomeDistributor;
