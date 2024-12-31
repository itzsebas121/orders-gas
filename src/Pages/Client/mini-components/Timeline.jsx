import React from 'react';
import ItemHistoryDelivery from './ItemHistoryDelivery';
const deliveryStates = [
    { id: 1, status: 'En proceso' },
    { id: 2, status: 'Aceptado' },
    { id: 3, status: 'En camino' },
    { id: 4, status: 'Entregado' },
];


const Timeline = () => {
    return (
        <section className="design-section">
            <div className="timeline">
                <div className="timeline-middle">
                    <div className="timeline-circle"></div>
                </div>
                {deliveryStates.map((state, index) => (
                    <React.Fragment key={state.id}>
                        <div className="timeline-empty"></div>
                        {index == deliveryStates.length -1 && (
                            <div className="timeline-component timeline-content" style={{ border: "5px solid #007BFF", boxShadow: "0px 0px 10px 0px rgba(45, 255, 87, 0.6)" }}>
                                <ItemHistoryDelivery status={state.status} />
                            </div>
                        )}
                        {deliveryStates.length - 1 !== index && (
                            <div className="timeline-component timeline-content" >
                                <ItemHistoryDelivery status={state.status} />
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
