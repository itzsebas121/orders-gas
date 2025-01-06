import React, { useState, useEffect, lazy } from 'react';
import ComponentLoading from '../../../components/ComponentLoading';
const ItemHistoryDelivery = lazy(() => import('./ItemHistoryDelivery'));

const Timeline = (props) => {
    const { OrderId } = props;
    const [deliveryStates, setDeliveryStates] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`http://localhost:3000/getStatusOrder/${OrderId}`)
            .then(response => response.json())
            .then(data => {
                setDeliveryStates(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [OrderId]);
    if (loading) {
        return (
            <div className="design-section">
                <ComponentLoading />
            </div>
        );
    }
    return (
        <section className="design-section">
            <div className="timeline">
                <div className="timeline-middle">
                    <div className="timeline-circle"></div>
                </div>
                {deliveryStates.map((state, index) => (
                    <React.Fragment key={state.id}>
                        <div className="timeline-empty"></div>
                        {index === deliveryStates.length - 1 && (
                            <div className="timeline-component timeline-content" style={{ border: "5px solid #007BFF", boxShadow: "0px 0px 10px 0px rgba(45, 255, 87, 0.6)" }}>
                                <ItemHistoryDelivery
                                    status={state.StatusDetail}
                                    date={new Date(state.DateUpdate).toLocaleString()} 
                                />
                            </div>
                        )}
                        {deliveryStates.length - 1 !== index && (
                            <div className="timeline-component timeline-content">
                                <ItemHistoryDelivery
                                    status={state.StatusDetail}
                                    date={new Date(state.DateUpdate).toLocaleString()} 
                                />
                            </div>
                        )}
                        {index < deliveryStates.length - 1 && (
                            <div className="timeline-middle">
                                <div className="timeline-circle"></div>
                            </div>
                        )}
                    </React.Fragment>
                ))}

                <div className="timeline-empty"></div>
            </div>
        </section>
    );
};

export default Timeline;
